import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import './d2l-w2d-list-item.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';

const rel = Object.freeze({
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage'
});

class W2dList extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			category: { type: String },
			collapsed: { type: Boolean },
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
		if (!this._activities) {
			return null;
		}
		return html`
			<d2l-list separators="${this.collapsed ? 'none' : 'all'}">
				${this._activities.map(activity => html`
					<d2l-w2d-list-item href="${activity.href}" .token="${this.token}" ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
				`)}
			</d2l-list>
		`;
	}

}

customElements.define('d2l-w2d-list', W2dList);
