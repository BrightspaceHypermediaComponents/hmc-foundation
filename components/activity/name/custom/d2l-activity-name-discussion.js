import '../../../common/d2l-hc-name.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LabelMixin } from '@brightspace-ui/core/mixins/labelled-mixin.js';

const rels = Object.freeze({
	topic: 'https://discussions.api.brightspace.com/rels/topic'
});

export class ActivityNameDiscussion extends LabelMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			_topicHref: { type: String, observable: observableTypes.link, rel: rels.topic, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${this._topicHref}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-discussion', ActivityNameDiscussion, 'd2l-activity-name', [['user-discussion-activity']]);
