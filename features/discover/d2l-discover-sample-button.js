/**
 * This button is designed for demoing with a legacy page and will be removed once the rules
 * component is integrated into the Course Offering Information page
 */
import '@brightspace-ui/core/components/button/button.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeDiscoverEntitlement } from './lang/localization.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class SampleButton extends LocalizeDiscoverEntitlement(RtlMixin(LitElement)) {

	static get properties() {
		return {
			text: { type: String }
		};
	}

	render() {
		return html`
			<d2l-button @click="${this._onClick}">${this.text}</d2l-button>
		`;
	}

	_onClick() {
		const event = new CustomEvent('d2l-sample-button-click', {
			bubbles: true,
			detail: {
				value: this.text
			}
		});
		this.dispatchEvent(event);
	}
}
customElements.define('d2l-discover-sample-button', SampleButton);
