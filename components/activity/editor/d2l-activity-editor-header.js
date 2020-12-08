import '../description/d2l-activity-description-editor.js';
import '../name/d2l-activity-name-editor.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

class ActivityEditorHeader extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			subTitle: { type: String, attribute: 'sub-title' }
		};
	}

	static get styles() {
		return css`
			:host {
				background: white;
				box-shadow: inset 0 -1px 0 0 #e3e9f1;
				display: block;
				margin-top: 1.25rem;
				padding: 2.3rem 1.5rem;
			}
			.d2l-activity-header-content {
				max-width: 790px;
				padding: 0 0.35rem;
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
			<div class="d2l-activity-header-content">
				<div class="d2l-heading-4 d2l-activity-sub-header">${this.subTitle}</div>
				<h1 class="d2l-heading-1">
					<d2l-activity-name-editor href="${this.href}" .token="${this.token}"></d2l-activity-name-editor>
				</h1>
				<d2l-activity-description-editor href="${this.href}" .token="${this.token}"></d2l-activity-description-editor>
			</div>
		`;
	}
}

customElements.define('d2l-activity-editor-header', ActivityEditorHeader);
