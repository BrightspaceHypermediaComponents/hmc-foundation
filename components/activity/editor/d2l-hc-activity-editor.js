import '@brightspace-ui/core/components/button/floating-buttons.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import './d2l-activity-editor-footer.js';
import './d2l-activity-editor-header.js';
import './d2l-activity-editor-sidebar.js';
import './d2l-activity-editor-main.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { nothing } from 'lit-html';

class ActivityEditor extends LitElement {
	static get properties() {
		return {
			href: { type: String, reflect: true },
			noHeader: { type: Boolean, attribute: 'no-header' },
			subTitle: { type: String, attribute: 'sub-title', reflect: true },
			template: { type: String },
			token: { type: String }
		};
	}

	static get styles() {
		return [css`
			:host {
				display: block;
			}

			.d2l-activity-editor-template-default {
				display: grid;
				grid-template-areas:
					"header"
					"content"
					"footer";
				grid-template-columns: auto;
				grid-template-rows: auto 1fr auto;
				height: calc(100vh - 62px);
			}

			[class^="d2l-activity-editor-main"] {
				display: block;
			}
			[class^="d2l-activity-editor-sidebar"] {
				display: block;
				padding: 10px;
			}
		`];
	}

	constructor() {
		super();
		this.template = 'primary-secondary';
	}

	render() {
		const templates = {
			'default': () => this._renderDefault(),
			'primary-secondary': () => this._renderPrimarySecondary()
		};

		if (!Object.keys(templates).includes(this.template)) {
			console.error(`Template "${this.template}" does not exist in d2l-activity-editor`);
			return null;
		}

		return templates[this.template]();
	}

	_renderDefault() {
		return html`
			<div class="d2l-activity-editor-template-default">
				${this.noHeader ? nothing : html`
					<d2l-activity-editor-header href="${this.href}" .token="${this.token}"></d2l-activity-editor-header>
				`}
				<d2l-activity-editor-main href="${this.href}" .token="${this.token}"></d2l-activity-editor-main>
				<d2l-floating-buttons always-float>
					<d2l-activity-editor-footer href="${this.href}" .token="${this.token}"></d2l-activity-editor-footer>
				</d2l-floating-buttons>
			</div>
		`;
	}

	_renderPrimarySecondary() {
		return html`
			<d2l-template-primary-secondary background-shading="secondary">
				<slot name="editor-nav" slot="header"></slot>
				${this.noHeader ? nothing : html`
					<d2l-activity-editor-header slot="primary" href="${this.href}" .token="${this.token}"></d2l-activity-editor-header>
				`}
				<d2l-activity-editor-main slot="primary" href="${this.href}" .token="${this.token}" class="d2l-activity-editor-main"></d2l-activity-editor-main>
				<d2l-activity-editor-sidebar slot="secondary" href="${this.href}" .token="${this.token}" class="d2l-activity-editor-sidebar"></d2l-activity-editor-sidebar>
				<div slot="footer">
					<d2l-activity-editor-footer href="${this.href}" .token="${this.token}"></d2l-activity-editor-footer>
				</div>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-hc-activity-editor', ActivityEditor);
