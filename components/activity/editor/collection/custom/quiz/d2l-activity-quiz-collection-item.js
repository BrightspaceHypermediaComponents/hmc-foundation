import '@brightspace-ui/core/components/list/list-item-content.js';

import '../../../../image/d2l-activity-image.js';
import '../../../../name/d2l-activity-name.js';
import '../../../../type/d2l-activity-type.js';

import './d2l-activity-list-item-topic.js';
import './d2l-activity-list-item-module.js';

import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});

class ActivityListItem extends HypermediaStateMixin(ListItemMixin(LitElement)) {
	static get properties() {
		return {
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	static get styles() {
		return [ super.styles ];
	}

	render() {
		return this._renderListItem({
			//${guard([this._activityHref, this.token], () => html`<d2l-activity-list-item-content href="${this._activityHref}" .token="${this.token}"></d2l-activity-list-item-content>`)}`
			content: html`${guard([this._activityHref, this.token], () => html`<d2l-activity-list-item-content href="${this._activityHref}" .token="${this.token}"></d2l-activity-list-item-content>`)}`,
			// actions: html`actions here`
		});
	}
}
customElements.define('d2l-activity-quiz-collection-item', ActivityListItem);
