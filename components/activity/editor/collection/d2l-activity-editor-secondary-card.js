
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

class ActivityEditorSecondaryCard extends LitElement {

	static get styles() {
		return [labelStyles, css`
			:host([hidden]) {
				display: none;
			}
			:host {
				display: flex;
				flex-direction: column;
				background: var(--d2l-color-white);
				border-radius: 8px;
				margin-bottom: 10px;
				padding: 20px;
				padding-top: 0;
			}
		`];
	}

	render() {
		return html`
		<span slot="header">
		<h3>
		Additional Identification
		</h3>
		<hr>
		</span>
		<span class="content">
		Blah blah blah
		</span>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-card', ActivityEditorSecondaryCard);
