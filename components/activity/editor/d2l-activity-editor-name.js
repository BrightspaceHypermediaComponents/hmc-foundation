import '../../common/d2l-hm-name.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { customHypermediaElement } from '../../../framework/hypermedia-components.js';

class ActivityEditorName extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property },
			updateName: { type: Object, observable: observableTypes.action, name: 'update-name' }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return this._hasAction('updateName') ? html`
			<d2l-input-text
				@input="${this._onInputName}"
				@change="${this._onChangeName}"
				label="Name"
				placeholder="Enter a name"
				value="${this.name}"
			></d2l-input-text>
		` : null;
	}

	_onChangeName(e) {
		if (this.updateName.has) {
			this.updateName.perform({name: e.target.value});
		}
	}

	_onInputName(e) {
		if (this.updateName.has) {
			this.updateName.update({name: { observable: observableTypes.property, value: e.target.value} });
		}
	}

}

customHypermediaElement('d2l-activity-editor-name', ActivityEditorName);
