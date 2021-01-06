import '@brightspace-ui/core/components/switch/switch-visibility.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { nothing } from 'lit-html';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';

class ActivityVisibilityEditorToggle extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			canEditDraft: { type: Boolean, attribute: 'can-edit-draft' },
			disabled: { type: Boolean },
			_isDraft: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes('draft') },
			_textHidden: { type: Boolean },
			_updateDraft: { type: Object, observable: observableTypes.action, name: 'update-draft' }
		};
	}

	static get styles() {
		return [offscreenStyles, css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}
	// "${this.switchEnabled ? html`disabled` : nothing}"
	render() {
		return html`
			<d2l-switch-visibility
				?disabled="${!this.switchEnabled}"
				@change="${this._onChange}"
				?on="${!this._isDraft}"
				text-position="${this._textHidden ? 'hidden' : 'end'}">
			</d2l-switch-visibility>
			`;
	}

	get isDisabled() {
		if (!this.switchEnabled) {
			return html`disabled`;
		} else {
			return nothing;
		}
	}

	get switchEnabled() {
		return this.canEditDraft && !this.disabled;
	}

	_onChange() {
		if (this._draftValue === undefined) {
			this._draftValue = this._isDraft;
		}
		this._draftValue = !this._draftValue;
		if (this.updateDraft.has) {
			this.updateDraft.commit({draft: this._draftValue});
		}
	}

}

customHypermediaElement('d2l-hc-visibility-toggle', ActivityVisibilityEditorToggle);
