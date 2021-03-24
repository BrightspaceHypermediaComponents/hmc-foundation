import '@brightspace-ui-labs/caketray/caketray.js';
import '../../code/custom/d2l-activity-code-editor-learning-path.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

class ActivityEditorLearningPathCard extends LocalizeDynamicMixin(LitElement) {

	static get properties() {
		return {
			href: { type: String, reflect: true },
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
		`];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	render() {
		return html`
		<d2l-labs-caketray title-text="${this.localize('title-identification')}" aria-label=${this.localize('title-identification')}>
			<d2l-activity-code-editor-learning-path slot="card-content" href="${this.href}" .token="${this.token}"></d2l-activity-code-editor-learning-path>
		</d2l-labs-caketray>`;
	}
}

customHypermediaElement('d2l-activity-card-learning-path', ActivityEditorLearningPathCard);
