import '@brightspace-ui/core/components/list/list.js';
import './d2l-activity-list-item.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { HcPaginationMixin } from '../../common/d2l-hc-pagination-mixin.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityListPaginated extends HcPaginationMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			...super.properties,
			activities: { type: Array, observable: observableTypes.subEntities, rel: rels.organization }
		};
	}

	render() {
		return html`
			<d2l-list>
				${this.activities.map((item) => {
					return html`<d2l-activity-list-item href="${item.href}" .token="${this.token}"></d2l-activity-list-item>`
				})}
			</d2l-list>
			${this._renderPagination()}
		`;
	}
}
customElements.define('d2l-activity-list-paginated', ActivityListPaginated);
