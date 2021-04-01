import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

class w2dNoActivities extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			_entity: { type: Object, observable: observableTypes.entity }
		};
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	render() {
		return this._render_two_week_complete();
	}
	_render_empty() {
		return html``;
	}

	_render_two_week_complete() {
		return html`<h3>${this.localize('allClear')}</h3>
		<p>${this.localize('activitiesAvailable')}</p>`;
	}

	_render_two_week_empty() {
		return html``;
	}
}

customElements.define('d2l-w2d-no-activities', w2dNoActivities);
