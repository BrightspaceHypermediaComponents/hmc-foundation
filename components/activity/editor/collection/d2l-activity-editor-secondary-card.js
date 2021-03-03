
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

class ActivityEditorSecondaryCard extends LitElement {

	static get properties() {
		return {
			ref: { type: String, reflect: true },
			token: { type: String },
			titleText: { type: String, attribute: 'title-text' },
			bodyText: { type: String, attribute: 'body-text' },
			collapsable: { type: Boolean }
		};
	}

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
			.d2l-activity-editor-card {
				display: grid;
				grid-template-rows: [start header] auto [content] auto [end];
			}
			::slotted([slot=header]) {
				grid-row: header;
			}
			::slotted([slot=content]) {
				grid-row: content;
			}
		`];
	}

	render() {
		return this.collapsable ? this._renderCollapsable() : this._renderDefault();

	}

	_renderDefault() {
		return html`
			<span slot="header">
				<h3>${this.titleText}</h3>
				<hr>
			</span>
			<span class="content">${this.bodyText}</span>
			<slot name="card-content"></slot>
		`;
	}

	_renderCollapsable() {
		return html`
		<d2l-labs-accordion-collapse flex>
			<span slot="header">
				<h3>${this.titleText}</h3>
				<hr>
			</span>
			<span class="content">${this.bodyText}</span>
			<slot name="card-content"></slot>
		</d2l-labs-accordion-collapse>
		`;
	}
}

customHypermediaElement('d2l-activity-secondary-card', ActivityEditorSecondaryCard);
