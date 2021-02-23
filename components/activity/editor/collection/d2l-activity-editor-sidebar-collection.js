import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import '@brightspace-ui-labs/accordion/accordion.js';
import './d2l-activity-editor-secondary-card.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityCollectionEditorSidebar extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
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
			:host > * {
				background: var(--d2l-color-white);
				border-radius: 8px;
				margin-bottom: 10px;
				padding: 20px;
				padding-top: 0;
			}
			`
		];
	}

	render() {
		return html`
		<d2l-activity-editor-card>
		</d2l-activity-editor-card>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-sidebar-collection', ActivityCollectionEditorSidebar, 'd2l-activity-editor-sidebar', [['activity-collection'], ['learning-path']]);
