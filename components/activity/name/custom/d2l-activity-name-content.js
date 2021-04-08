import '../../../common/d2l-hc-name.js';
import { LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	content: 'https://api.brightspace.com/rels/content'
});

export class ActivityNameContent extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_title: { type: String, observable: observableTypes.property, route: [{observable: observableTypes.link, rel: rels.content}] },
			_contentHref: { type: String, observable: observableTypes.link, rel: rels.content, prime: true }
		};
	}

	render() {
		return html`
			${this._loaded && this._title ? html`${this._title}` : html`<d2l-hc-name href="${this._contentHref}" .token="${this.token}"></d2l-hc-name>`}
		`;
	}

}

customHypermediaElement('d2l-activity-name-content', ActivityNameContent, 'd2l-activity-name', [['user-content-activity']]);
