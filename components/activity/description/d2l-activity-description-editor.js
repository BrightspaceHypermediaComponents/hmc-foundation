import '../../common/d2l-hc-description.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
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
					.d2l-activity-description-textfield {
						height: 5rem;
					}
				}

				.d2l-activity-description-editor textarea {
					height: 100%;
					left: 0;
					position: absolute;
					resize: none;
					top: 0;
				}
				.d2l-activity-description-editor {
					min-height: 1rem;
					position: relative;
				}
				.d2l-activity-description-textfield {
					line-height: normal;
					max-height: 6rem;
					visibility: hidden;
				}
			`
		];
	}

	constructor() {
		super();
		this._descriptionId = getUniqueId();
	}

	render() {
		return this._loaded ? html`
		<label class="d2l-input-label" for="${this._descriptionId}">
			<span class="">${this.localize('label-description')}</span>
		</label>
		<div class="d2l-activity-description-editor">
			<div class="d2l-activity-description-textfield d2l-input">${this.description}</div>
			<textarea class="d2l-input"
				.value="${this.description}"
				@input="${this._onInputDescription}"
				id="${this._descriptionId}"
				placeholder="${this.localize('input-description')}"
			>${this.description ? this.description : ''}</textarea>
		</div>
		` : html`<d2l-input-text label="${this.localize('label-description')}" skeleton></d2l-input-text>`;
	}

	_onInputDescription(e) {
		if (this._hasAction('updateDescription')) {
			this.updateDescription.commit({description: { observable: observableTypes.property, value: e.target.value} });
		}
	}
}

customHypermediaElement('d2l-activity-description-editor', ActivityDescriptionEditor);
