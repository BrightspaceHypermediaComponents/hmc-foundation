import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import './d2l-activity-editor-footer.js';
import './d2l-activity-editor-header.js';
import './d2l-activity-editor-sidebar.js';
import './d2l-activity-editor-main.js';
import '../dialog/d2l-activity-dialog-load-failed.js';
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
				height: calc(100vh - 134px);
				margin: auto;
				max-width: 1230px;
				overflow-y: scroll;
			}

			[class^="d2l-activity-editor-main"] {
				display: block;
			}
			[class^="d2l-activity-editor-sidebar"] {
				display: block;
				padding: 10px;
			}
			iron-overlay-backdrop {
				--iron-overlay-backdrop-opacity: 0.0;
			}
			.d2l-activity-editor-template-default-footer {
				background-color: #ffffff;
				background-color: rgba(255, 255, 255, 0.88);
				border-top-color: var(--d2l-color-mica);
				border-top: 1px solid transparent;
				bottom: 0px;
				box-shadow: 0 -2px 4px rgba(73, 76, 78, 0.2); /* ferrite */
				display: block;
				left: 0;
				position: fixed;
				right: 0;
				z-index: 999;
			}
			.d2l-activity-editor-template-default-footer * {
				margin: auto;
				max-width: 1230px;
				padding: 0.55rem 1.7rem 0.6rem 1.7rem;
			}
			.d2l-actiity-editor-template-footer-space {
				height: 0px;
			}

			.d2l-template-scroll::-webkit-scrollbar {
				width: 8px;
			}
			.d2l-template-scroll::-webkit-scrollbar-track {
				background: rgba(255, 255, 255, 0.4);
			}
			.d2l-template-scroll::-webkit-scrollbar-thumb {
				background: var(--d2l-color-galena);
				border-radius: 4px;
			}
			.d2l-template-scroll::-webkit-scrollbar-thumb:hover {
				background: var(--d2l-color-tungsten);
			}
			/* For Firefox */
			.d2l-template-scroll {
				scrollbar-color: var(--d2l-color-galena) rgba(255, 255, 255, 0.4);
				scrollbar-width: thin;
			}
		`];
	}

	constructor() {
		super();
		this.template = 'default';
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
			<div class="d2l-activity-editor-template-default d2l-template-scroll">
				${this.noHeader ? nothing : html`
					<d2l-activity-editor-header href="${this.href}" .token="${this.token}"></d2l-activity-editor-header>
				`}
				<d2l-activity-editor-main href="${this.href}" .token="${this.token}"></d2l-activity-editor-main>
				<div class="d2l-actiity-editor-template-footer-space"></div>
				<div class="d2l-activity-editor-template-default-footer">
					<d2l-activity-editor-footer href="${this.href}" .token="${this.token}"></d2l-activity-editor-footer>
				</div>
			</div>
			${this._renderLoadFailureDialog()}
		`;
	}

	_renderLoadFailureDialog() {
		return html`
			<d2l-activity-dialog-load-failed href="${this.href}" .token="${this.token}"></d2l-activity-dialog-load-failed>
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
			${this._renderLoadFailureDialog()}
		`;
	}
}
customElements.define('d2l-hc-activity-editor', ActivityEditor);
