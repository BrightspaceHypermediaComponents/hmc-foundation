import '@brightspace-ui/core/components/switch/switch-visibility.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { LocalizeFoundationVisibility } from './lang/localization.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';

class ActivityVisibilityEditorToggle extends LocalizeFoundationVisibility(HypermediaStateMixin(LitElement)) {

	static get properties() {
		return {
			disabled: { type: Boolean },
			_isDraft: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes('draft') },
			canEditDraft: { type: Boolean, attribute: 'can-edit-draft' },
			_textHidden: { type: Boolean },
			updateDraft: { type: Object, observable: observableTypes.action, name: 'update-draft' },
			_DraftValue: { type: Boolean, method: (classes) => classes.includes('draft') }
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

	render() {
		if (this.switchEnabled) {
			return html`
				<d2l-switch-visibility
					@change="${this._onChange}"
					?on="${!this._isDraft}"
					text-position="${this._textHidden ? 'hidden' : 'end'}">
				</d2l-switch-visibility>
			`;
		} else {
			return html`
				<div class="d2l-label-text">
					<d2l-icon icon="${this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show'}"></d2l-icon>
					<span class="${classMap({ 'd2l-offscreen': this._textHidden })}">
						${this.isDraft ? this.localize('label.hidden') : this.localize('label.visible')}
					</span>
				</div>
			`;
		}
	}

	get switchEnabled() {
		return this.canEditDraft && !this.disabled;
	}

	_onChange(e) {
		console.log(e);
		this._DraftValue = !this._DraftValue;
		if (this.updateDraft.has) {
			this.updateDraft.commit({draft: !this._DraftValue});
		}
	}

}

customHypermediaElement('d2l-hc-activity-visibility-editor-toggle', ActivityVisibilityEditorToggle, 'd2l-hc-visibility', [['learning-path']]);
