import '../description/d2l-activity-description.js';
import './d2l-activity-editor-name.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { html } from '../../../framework/hypermedia-components.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityEditorHeader extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			subTitle: { type: String, attribute: 'sub-title' },
			_specializationHref: { type: String, observable: observableTypes.link, rel: rels.specialization, prime: true},
		};
	}

	static get styles() {
		return css`
			:host {
				background: white;
				box-shadow: inset 0 -1px 0 0 #e3e9f1;
				display: block;
				padding: 0.75rem 1.5rem 0;
			}

			@media only screen and (max-width: 929px) {
				:host {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
			}
		`;
	}
	render() {
		return html`
			<div class="d2l-heading-4 d2l-activity-sub-header">${this.subTitle}</div>
			<h1 class="d2l-heading-1">
				<d2l-activity-editor-name href="${this._specializationHref}" .token="${this.token}"></d2l-activity-editor-name>
			</h1>
		`;
	}
}

customElements.define('d2l-activity-editor-header', ActivityEditorHeader);
