import './d2l-activity-card-learning-path.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityCollectionEditorSidebar extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			href: { type: String, reflect: true },
			token: { type: String },
			_specializationHref: { type: String, observable: observableTypes.link, rel: rels.specialization }
		};
	}
	static get styles() {

		return [
			css`
			:host {
				background: var(--d2l-color-gypsum);
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			`
		];
	}

	render() {
		return html`
		<d2l-activity-card-learning-path href="${this.href}" .token="${this.token}" }></d2l-activity-card-learning-path>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-sidebar-learning-path', ActivityCollectionEditorSidebar, 'd2l-activity-editor-sidebar', [['activity-collection'], ['learning-path']]);
