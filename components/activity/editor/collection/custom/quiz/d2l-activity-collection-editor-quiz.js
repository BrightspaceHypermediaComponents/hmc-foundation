import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import './d2l-activity-collection-item-quiz.js';
import './d2l-activity-collection-item-delete-quiz.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { repeat } from 'lit-html/directives/repeat';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage',
	item: 'item'
});

const route = {
	collection:
		{ observable: observableTypes.link, rel: rels.collection }
};

class ActivityCollectionEditorQuiz extends SkeletonMixin(HypermediaStateMixin(LitElement)) {

	static get properties() {
		return {
			items: {
				type: Array,
				observable: observableTypes.subEntities,
				rel: rels.item,
				route: [route.collection]
			},
			_selectionCount: { type: Number },
			_refreshState: {
				type: Object,
				observable: observableTypes.refreshState,
				route: [route.collection]
			},
			_startAddExisting: {
				observable: observableTypes.summonAction,
				name: 'start-add-existing-activity',
				route: [route.collection]
			},
			_startAddExistingExecuteMultiple: {
				observable: observableTypes.summonAction,
				name: 'execute-multiple',
				route: [
					route.collection,
					{ observable: observableTypes.summonAction, name: 'start-add-existing-activity' }
				]
			}
		};
	}

	static get styles() {
		return [ super.styles, css`
			.d2l-activity-collection-body {
				margin: auto;
				max-width: 1230px;
				padding: 0 1.5rem;
			}
			.d2l-activity-collection-body-content {
				margin: 0 -1.5rem;
				padding: 0 0.35rem;
			}
			.d2l-activity-collection-activities {
				margin: 0 -1.5rem;
				padding: 0 0.05rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: flex-end;
				margin: 0.1rem 0;
				padding-bottom: 1rem;
				position: relative;
			}
		`];
	}

	constructor() {
		super();
		this.items = [];
		this._currentSelection = new Map();
		this._selectionCount = 0;
		this.addEventListener('d2l-activity-collection-refetch', this._handleRefetch);
		this.addEventListener('d2l-question-updated', this._handleQuestionUpdate);
		this.addEventListener('d2l-collection-item-delete-dialog-open', this._handleDeleteDialogOpen);
		this.addEventListener('d2l-collection-item-delete-dialog-confirm', this._handleDeleteDialogConfirm);
		this.addEventListener('d2l-collection-item-delete-dialog-cancel', this._handleDeleteDialogCancel);
	}

	render() {
		const canRemoveItems = this.items && this.items[0] && this.items[0].actions.includes('remove-activity');
		return html`
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
				${this.items.length ? html`
					<div class="d2l-activity-collection-list-actions d2l-skeletize">
						<d2l-activity-collection-item-delete-quiz ?can-remove-items=${canRemoveItems} selection-count="${this._selectionCount}"></d2l-activity-collection-item-delete-quiz>
					</div>
				` : null}
				</div>
				<div class="d2l-activity-collection-activities">
					<d2l-list separators="none" @d2l-list-item-position-change="${this._moveItems}" @d2l-list-selection-change="${this._onSelectionChange}">
						${repeat(this.items, item => item.href, (item, idx) => html`
							<d2l-activity-collection-item-quiz number="${idx + 1}" href="${item.href}" .token="${this.token}" key="${item.properties.id}"></d2l-activity-collection-item-quiz>
						`)}
					</d2l-list>
				</div>
			</div>
		`;
	}
	async addToCollection(activityHrefs) {
		if (!activityHrefs || !activityHrefs.length || !this._hasAction('_startAddExisting')) {
			return;
		}

		const summoned = await this._startAddExisting.summon({}, true);
		const candidates = summoned.entities;

		if (!this._hasAction('_startAddExistingExecuteMultiple')) {
			return;
		}

		const actionStates = [];
		const activityUsageLink = item => item.links.find(link => link.rel.includes(rels.activityUsage)).href;
		for (const activityHref of activityHrefs) {
			const candidate = candidates.find(e => activityUsageLink(e) === activityHref);
			if (candidate && candidate.properties && candidate.properties.actionState) {
				actionStates.push(candidate.properties.actionState);
			}
		}

		if (!actionStates.length) {
			return;
		}

		await this._startAddExistingExecuteMultiple.summon({
			actionStates: actionStates.join()
		});

		this._refreshState();
	}
	get _loaded() {
		return !this.skeleton;
	}
	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_handleDeleteDialogCancel() {
		this._state.reset();
	}
	_handleDeleteDialogConfirm() {
		this._state.push();
	}
	_handleDeleteDialogOpen() {
		this.shadowRoot.querySelectorAll('d2l-activity-collection-item-quiz[selected]').forEach(itemElem => itemElem.deleteAction.has && itemElem.deleteAction.commit({}));
	}
	_handleQuestionUpdate() {
		fetch(this._state, true);
	}
	_handleRefetch() {
		this._refreshState();
	}
	_moveItems(e) {
		e.detail.reorder(this.items, { keyFn: (item) => item.properties.id });
		this.requestUpdate('items', []);
	}
	_onSelectionChange(e) {
		if (e.detail.selected && !this._currentSelection.has(e.detail.key)) {
			const candidate = this.items.find((candidate) => candidate.properties.id === e.detail.key);
			this._currentSelection.set(e.detail.key, candidate);
		} else if (!e.detail.selected && this._currentSelection.has(e.detail.key)) {
			this._currentSelection.delete(e.detail.key);
		}
		this._selectionCount = this._currentSelection.size;
	}
}

customHypermediaElement('d2l-activity-collection-editor-quiz', ActivityCollectionEditorQuiz, 'd2l-activity-editor-main', [['quiz-activity']]);
