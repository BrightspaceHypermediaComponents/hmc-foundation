import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import './d2l-w2d-list-item.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LitElement, html as lithtml } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';

const rel = Object.freeze({
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage'
});

class W2dList extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			category: { type: String },
			collapsed: { type: Boolean },
			limit: { type: Number },
			skeleton: { type: Boolean},
			allowUnclickableActivities: { type: Boolean, attribute: 'allow-unclickable-activities' },
			clickableFutureActivities: { type: Boolean, attribute: 'clickable-future-activities' },
			_activities: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				rel: rel.userActivity,
				category: 'category'
			}
		};
	}

	constructor() {
		super();
		this._activities = [];
		this.collapsed = false;
		this.requiredPropertyForState('category');
	}

	render() {
		if (this.skeleton || !this._activities) return this._renderSkeleton();
		let activities = this._activities;
		if (this.limit !== undefined) {
			activities = activities.slice(0, this.limit);
		}
		return html`
			<d2l-list separators="${this.collapsed ? 'none' : 'all'}">
				${activities.map(activity => html`
					<d2l-w2d-list-item
						href="${activity.href}"
						.token="${this.token}"
						?collapsed="${this.collapsed}"
						?allow-unclickable-activities="${this.allowUnclickableActivities}"
						?clickable-future-activities="${this.clickableFutureActivities}">
					</d2l-w2d-list-item>
				`)}
			</d2l-list>
		`;
	}

	_renderSkeleton() {
		if (!this.skeleton && this._loaded)  return null;
		return lithtml`
			<d2l-list separators="${this.collapsed ? 'none' : 'all'}">
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
			</d2l-list>
		`;
	}

}

customElements.define('d2l-w2d-list', W2dList);
