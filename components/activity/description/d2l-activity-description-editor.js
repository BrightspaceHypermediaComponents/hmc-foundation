import '../../common/d2l-hc-description.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeFoundationDescription } from './lang/localization.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityDescriptionEditor extends LocalizeFoundationDescription(HypermediaStateMixin(LitElement)) {

	static get properties() {
		return {
			description: { type: String, observable: observableTypes.property, route: [{observable: observableTypes.link, rel: rels.specialization}]},
			updateDescription: { type: Object, observable: observableTypes.action, name: 'update-description',
				route: [{observable: observableTypes.link, rel: rels.specialization}]
			}
		};
	}

	static get styles() {
		return [ inputLabelStyles, inputStyles,
			css`
			@media (max-width: 615px) {
				.d2l-activity-description-editor textarea {
					height: 5rem;
				}
			}

			.d2l-activity-description-editor textarea {
				resize: none;
			}
			`
		];
	}

	render() {
		return this._hasAction('updateDescription') ? html`
		<label class="d2l-activity-description-editor">
			<span class="d2l-input-label">${this.localize('label.description')}</span>
			<textarea class="d2l-input"
				@input="${this._onInputDescription}"
				placeholder="${this.localize('input.description')}"
				.value="${this.description}"
			>${this.description ? this.description : ''}</textarea>
		</label>
		` : null;
	}

	_onInputDescription(e) {
		if (this._hasAction('updateDescription')) {
			this.updateDescription.commit({description: { observable: observableTypes.property, value: e.target.value} });
		}
	}
}

customHypermediaElement('d2l-activity-description-editor', ActivityDescriptionEditor);
