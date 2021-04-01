import '@brightspace-ui/core/components/list/list-item-content.js';
import '../../components/activity/icon/d2l-activity-icon.js';
import '../../components/activity/name/d2l-activity-name.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class W2DListItem extends HypermediaStateMixin(ListItemLinkMixin(LitElement)) {
	static get properties() {
		return {
			_activityUsageHref: { type: String, observable: observableTypes.link, rel: 'https://activities.api.brightspace.com/rels/activity-usage' }
		};
	}

	constructor() {
		super();
		this.actionHref = '#';
	}

	render() {
		return this._renderListItem({
			illustration: html`${guard([this.href, this.token], () => html`
				<d2l-activity-icon href="${this.href}" .token="${this.token}"></d2l-activity-icon>
			`)}`,
			content: html`${guard([this.href, this.token], () => html`
				<d2l-list-item-content>
					<d2l-activity-name href="${this._activityUsageHref}" .token="${this.token}"></d2l-activity-name>
				</d2l-list-item-content>
			`)}`
		});
	}
}
customElements.define('d2l-w2d-list-item', W2DListItem);
