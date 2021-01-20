import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import '../../image/d2l-activity-image.js';
import '../../name/d2l-activity-name.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeCollectionAdd } from './lang/localize-collection-add.js';
import { repeat } from 'lit-html/directives/repeat.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage',
	item: 'item'
});

const KEYCODES = Object.freeze({
	space: 32,
	enter: 13
});

class ActivityEditorCollectionAdd extends HypermediaStateMixin(LocalizeCollectionAdd(LitElement)) {
	static get properties() {
		return {
			_items: { observable: observableTypes.subEntities, rel: rels.item },
			_startAddExisting: { observable: observableTypes.summonAction, name: 'start-add-existing-activity' },
			_startAddExistingNext: { observable: observableTypes.summonAction, name: 'next', route: [
				{ observable: observableTypes.summonAction, name: 'start-add-existing-activity' }
			] },
			_startAddExistingSearch: { observable: observableTypes.summonAction, name: 'search', route: [
				{ observable: observableTypes.summonAction, name: 'start-add-existing-activity' }
			] },
			_candidates: { type: Array },
			_dialogOpened: { type: Boolean },
			_isLoadingCandidates: { type: Boolean },
			_isLoadingMore: { type: Boolean },
			_selectionCount: { type: Number }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-add-activity-dialog {
				align-content: start;
				align-items: start;
				display: grid;
				grid-template-areas: "." "list" ".";
				grid-template-columns: 100%;
				grid-template-rows: auto auto auto;
				min-height: 25rem;
			}
			.d2l-add-activity-dialog-list-disabled,
			.d2l-add-activity-dialog d2l-loading-spinner,
			.d2l-add-activity-dialog d2l-list {
				grid-area: list;
			}
			.d2l-add-activity-dialog-list-disabled {
				filter: grayscale(100%);
				opacity: 0.6;
			}
			.d2l-add-activity-dialog-header {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				padding-bottom: 0.5rem;
			}
			.d2l-add-activity-dialog-load-more {
				margin: 0.5rem 0;
			}
			.d2l-add-activity-dialog-selection-count {
				align-self: center;
				color: var(--d2l-color-ferrite);
				font-size: 0.8rem;
				margin-left: 0.5rem;
			}

			.d2l-activity-collection-no-activity {
				background-color: var(--d2l-color-regolith);
				border: solid 1px var(--d2l-color-gypsum);
				border-radius: 8px;
				padding: 2.1rem 2rem;
			}

			.d2l-list-item-supporting-info {
				color: var(--d2l-color-olivine-minus-1);
				font-size: 0.7rem;
			}
			.d2l-activity-item-illustration {
				grid-column: 1;
				grid-row: 1;
			}
		`;
	}

	constructor() {
		super();
		this._currentSelection = new Map();
		this._dialogOpened = false;
		this._isLoadingCandidates = true;
		this._items = [];
	}

	clearSelected() {
		this._currentSelection.clear();
		this._selectionCount = 0;
	}

	render() {
		const renderCandidates = () => {
			if (this._candidates && this._candidates.length <= 0) {
				return html`
					<div class="d2l-activity-collection-no-activity d2l-body-standard">
						${this.localize('list-noActivitiesFound')}
					</div>`;
			}

			const classes = { 'd2l-add-activity-dialog-list-disabled': this._isLoadingCandidates };

			return html`
				<d2l-list grid
					@d2l-list-selection-change="${this._onSelectionChange}"
					class="${classMap(classes)}">
				${this._candidates ? repeat(this._candidates, (candidate) => candidate.activityUsageHref, candidate => html`
					<d2l-list-item
						selectable
						?disabled="${candidate.alreadyAdded || this._isLoadingCandidates}"
						?selected="${candidate.alreadyAdded || this._currentSelection.has(candidate.properties.actionState)}"
						key="${candidate.properties.actionState}">
						${guard([candidate.activityUsageHref, candidate.token], () => html`
						<d2l-activity-image slot="illustration" class="d2l-activity-item-illustration" href="${candidate.activityUsageHref}" .token="${this.token}"></d2l-activity-image>`)}
						<d2l-list-item-content>
							${guard([candidate.activityUsageHref, candidate.token], () => html`<d2l-activity-name href="${candidate.activityUsageHref}" .token="${this.token}"></d2l-activity-name>`)}
							${guard([candidate.alreadyAdded], () => html`<div slot="supporting-info" class="d2l-list-item-supporting-info">${candidate.alreadyAdded ? this.localize('listitem-alreadyAdded') : null}</div>`)}
						</d2l-list-item-content>
					</d2l-list-item>
					`) : null }
				</d2l-list>
				${this._isLoadingCandidates ? html`<d2l-loading-spinner size="100"></d2l-loading-spinner>` : null}
			`;
		};
		const renderLoadMoreButton = () => {
			if (this._hasAction('_startAddExistingNext') && !this._isLoadingMore) {
				return html`<d2l-button @click="${this._onLoadMoreClick}">${this.localize('button-loadMore')}</d2l-button>`;
			} else if (this._isLoadingMore) {
				return html`<d2l-loading-spinner size="85"></d2l-loading-spinner>`;
			}
			return null;
		};

		return html`
			<d2l-button primary @click="${this._onAddActivityClick}">${this.localize('button-addActivity')}</d2l-button>

			<div class="dialog-div">
				<d2l-dialog id="dialog" ?opened="${this._dialogOpened}" title-text="${this.localize('dialog-browseActivityLibrary')}" @d2l-dialog-close="${this._onCloseDialog}">
					<div class="d2l-add-activity-dialog" aria-live="polite" aria-busy="${!this._candidates}">
						<div class="d2l-add-activity-dialog-header">
							<div>${this._hasAction('_startAddExistingSearch') ? html`
								<d2l-input-search label="${this.localize('label-search')}" placeholder="${this.localize('input-searchPlaceholder')}" @d2l-input-search-searched="${this._onSearch}"></d2l-input-search>
							` : null}
							</div>
							<div class="d2l-add-activity-dialog-selection-count">${this._selectionCount > 0 ? html`
									${this.localize('dialog-selected', 'count', this._selectionCount)}
									<d2l-link
										tabindex="0"
										role="button"
										@click=${this.clearSelected}
										@keydown="${this._onClearKeydown}">
											${this.localize('button-clearSelected')}
									</d2l-link>
								` : null }</div>
						</div>
						${renderCandidates()}
						<div class="d2l-add-activity-dialog-load-more">
							${renderLoadMoreButton()}
						</div>
					</div>
					<d2l-button slot="footer" primary dialog-action="add" @click="${this._onAddActivityCommit}" ?disabled="${!this._selectionCount}">${this.localize('button-add')}</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('button-cancel')}</d2l-button>
				</d2l-dialog>
			</div>
		`;
	}

	//todo: workaround until prime for summonAction is ready
	updated(changedProperties) {
		super.updated(changedProperties);
		if (!this._candidates && this._hasAction('_startAddExisting')) {
			this._loadCandidates();
		}

		if (changedProperties.has('_items') && this._candidates) {
			this._addExtrasToCandidates(this._candidates);
		}
	}

	_addExtrasToCandidates(candidates) {
		const activityUsageLink = item => item.links.find(link => link.rel.includes(rels.activityUsage)).href;
		for (const candidate of candidates) {
			candidate.activityUsageHref = activityUsageLink(candidate);
			// it's already been added if the items have an activity usage href that matches
			candidate.alreadyAdded = this._items && this._items.findIndex(x => activityUsageLink(x) === candidate.activityUsageHref) >= 0;
		}
		return candidates;
	}

	async _loadCandidates() {
		const summoned = await this._startAddExisting.summon();
		this._candidates = this._addExtrasToCandidates(summoned.entities);
		this._isLoadingCandidates = false;
	}

	_onAddActivityClick() {
		this._dialogOpened = true;
	}

	_onAddActivityCommit() {
		this._items.push(...this._selectedCandidates);
		this.clearSelected();
		// change the state's list of activities
		this._state.updateProperties({
			_items: {
				observable: observableTypes.subEntities,
				rel: rels.item,
				value: this._items
			}
		});
	}
	_onClearKeydown(e) {
		switch (e) {
			case KEYCODES.enter:
			case KEYCODES.space:
				this.clearSelected();
				break;
		}
	}

	_onCloseDialog() {
		this._dialogOpened = false;
		this.clearSelected();
	}

	async _onLoadMoreClick() {
		this._isLoadingMore = true;
		const summoned = await this._startAddExistingNext.summon();
		const newCandidates = this._addExtrasToCandidates(summoned.entities);
		this._candidates.push(...newCandidates);
		this._isLoadingMore = false;
	}

	async _onSearch(e) {
		this._isLoadingCandidates = true;
		const summoned = await this._startAddExistingSearch.summon({
			collectionSearch: e.detail.value
		});
		this._candidates = this._addExtrasToCandidates(summoned.entities);
		this._isLoadingCandidates = false;
	}

	_onSelectionChange(e) {
		if (e.detail.selected && !this._currentSelection.has(e.detail.key)) {
			const candidate = this._candidates.find((candidate) => candidate.properties.actionState === e.detail.key);
			this._currentSelection.set(e.detail.key, candidate);
		} else if (!e.detail.selected && this._currentSelection.has(e.detail.key)) {
			this._currentSelection.delete(e.detail.key);
		}
		this._selectionCount = this._currentSelection.size;
	}

	get _selectedCandidates() {
		return Array.from(this._currentSelection.values());
	}
}

customElements.define('d2l-activity-editor-collection-add', ActivityEditorCollectionAdd);
