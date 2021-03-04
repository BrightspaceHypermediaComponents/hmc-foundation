import './custom/d2l-activity-code-editor-learning-path.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css,  LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityCodeEditor extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			code: { type: String, observable: observableTypes.property, route: [{observable: observableTypes.link, rel: rels.organization}] },
			updateCode: { type: Object, observable: observableTypes.action, name: 'update-code', route: [{observable: observableTypes.link, rel: rels.organization}] }
		};
	}

	static get styles() {
		return [ inputLabelStyles, css`
			.d2l-activity-code-editor-description {
				font-size: 14px;
				line-height: 18px;
				font-weight: 400; /* normal */
				letter-spacing: 0.2px;
				color: #6E7376; /* Tungsten */
				margin-bottom: 6px;
			}
		` ];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	render() {
		return html`
			<d2l-input-text
				@input="${this._onInputCode}"
				label="${this.localize('label-code')}"
				value="${this.code}"
				?skeleton="${!this._loaded}"
			></d2l-input-text>
		`;
	}

	_onInputCode(e) {
		if (this._hasAction('updateCode')) {
			const code = e.target.value.trim();
			this.updateCode.commit({code: { observable: observableTypes.property, value: code} });
		}
	}

}

customHypermediaElement('d2l-activity-code-editor', ActivityCodeEditor);
