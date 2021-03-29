import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { W2DSirenClasses } from './w2dDateCategoryObserver.js';

class w2dWorkToDo extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_entity: { type: Object, observable: observableTypes.entity },
			_classes: { type: String, observable: observableTypes.custom, observableObject: W2DSirenClasses, method: (classes) => classes.pop() }
		};
	}
	render() {
		if (typeof this._entity === 'object') return html`${this._classes}<pre>${JSON.stringify(this._entity.toJSON(), undefined, 4)}</pre>`;
		return null;
	}

}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
