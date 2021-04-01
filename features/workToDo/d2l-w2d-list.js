import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import './d2l-w2d-list-item.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';

class W2dList extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			category: { type: String },
			_activities: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				category: 'category'
			}
		};
	}

	constructor() {
		super();
		this._activities = [];
		this.requiredPropertyForState('category');
	}

	render() {
		return html`
			<d2l-list>
				${this._activities.map(activity => html`
					<d2l-w2d-list-item href="${activity.href}" .token="${this.token}"></d2l-w2d-list-item>
				`)}
			</d2l-list>
		`;
	}

}

customElements.define('d2l-w2d-list', W2dList);
