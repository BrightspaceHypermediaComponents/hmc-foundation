import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

class w2dWorkToDo extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_entity: { type: Object, observable: observableTypes.entity }
		};
	}

	render() {
		if (typeof this._entity === 'object') return html`<pre>${JSON.stringify(this._entity.toJSON(), undefined, 4)}</pre>`;
		return null;
	}

}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
