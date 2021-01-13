// START custom component imports
// END custom component imports
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list.js';
import '../../list/d2l-activity-list-item-accumulator.js';
import './d2l-activity-editor-collection-add.js';

import { bodyCompactStyles, heading3Styles} from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeFoundationEditor } from '../lang/localization.js';
import { repeat } from 'lit-html/directives/repeat';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

class ActivityEditorMainCollection extends LocalizeFoundationEditor(SkeletonMixin(HypermediaStateMixin(LitElement))) {

	static get properties() {
		return {
			_bulkUpdateCollection: { observable: observableTypes.action, name: 'bulk-update-collection', route:
				[{ observable: observableTypes.link, rel: rels.collection }] },
			_items: { observable: observableTypes.subEntities, rel: rels.item, prime: true, route:
				[{ observable: observableTypes.link, rel: rels.collection }] },
			_collectionHref: { observable: observableTypes.link, rel: rels.collection }
		};
	}

	static get styles() {
		return [ super.styles, heading3Styles, bodyCompactStyles, css`
			:host {
				height: 100%;
			}

			.d2l-activity-collection-body {
				display: block;
				padding-left: 1.45rem;
				padding-right: 0.25rem;
			}
			.d2l-activity-collection-body-content {
				padding: 0 0.25rem;
			}
			.d2l-activity-collection-activities {
				margin: -0.65rem 0 0 -1.5rem;
				padding: 0 0.05rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				margin: 1.2rem 0.4rem 0.9rem 0;
			}
			.d2l-activity-collection-activity {
				align-items: center;
				background: var(--d2l-color-regolith);
				border-radius: 0.3rem;
				border: 1px solid var(--d2l-color-gypsum);
				box-sizing: border-box;
				display: flex;
				height: 3rem;
				margin-left: -0.3rem;
				margin-right: -0.3rem;
				padding: 0 2rem;
				position: relative;
				width: 1242px;
			}
			.d2l-activity-collection-activity-header-3 {
				color: var(--d2l-color-ferrite);
			}
		`];
	}

	constructor() {
		super();
		this._items = [];
		this.skeleton = true;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	render() {
		return html`
			<div class="d2l-activity-collection-activity">
				<h3 class="d2l-heading-3 d2l-activity-collection-activity-header-3">Activities</h3>
			</div>
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
					<div class="d2l-activity-collection-list-actions">
						<d2l-activity-editor-collection-add href="${this._collectionHref}" .token="${this.token}">
						</d2l-activity-editor-collection-add>

						<div class="d2l-body-compact d2l-skeletize">${this.localize('text-activities')} ${this._items.length}</div>
					</div>
				</div>
				<div class="d2l-activity-collection-activities">
					<d2l-list @d2l-list-item-position-change="${this._moveItems}" @d2l-remove-collection-activity-item="${this._onRemoveActivity}">${repeat(this._items, item => item.href || item.properties.actionState, item => html`
						<d2l-activity-list-item-accumulator
							href="${item.href || item.activityUsageHref}"
							.token="${this.token}"
							draggable
							key="${item.properties.id || item.properties.actionState}"></d2l-activity-list-item-accumulator>
						`)}
					</d2l-list>
				</div>
			</div>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('_items') && this._items && this._hasAction('_bulkUpdateCollection')) {
			this._bulkUpdateCollection.commit({
				itemIds: this._items.map(item => item.properties.id || item.properties.actionState)
			});
		}
	}

	_onRemoveActivity(e) {
		const key = e.detail.key;
		const removeIndex = this._items.findIndex(x => x.properties.id === key || x.properties.actionState === key);
		if (removeIndex < 0) return;
		this._items.splice(removeIndex, 1);
		this._state.updateProperties({
			_items: {
				observable: observableTypes.subEntities,
				rel: rels.item,
				value: this._items,
				route: [{ observable: observableTypes.link, rel: rels.collection }]
			}
		});
	}

	_moveItems(e) {
		e.detail.reorder(this._items, { keyFn: (item) => item.properties.id || item.properties.actionState });
		this.requestUpdate('_items', []);
	}
}

customHypermediaElement('d2l-activity-editor-main-collection', ActivityEditorMainCollection, 'd2l-activity-editor-main', [['activity-collection'], ['learning-path']]);
