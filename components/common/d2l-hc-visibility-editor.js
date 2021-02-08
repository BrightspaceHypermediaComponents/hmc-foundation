import '@brightspace-ui/core/components/switch/switch-visibility.js';
import { css, LitElement } from 'lit-element/lit-element';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';
import ResizeObserver from 'resize-observer-polyfill';

const ro = new ResizeObserver(entries => {
	entries.forEach(entry => {
		if (!entry || !entry.target || !entry.target.resizedCallback) {
			return;
		}
		entry.target.resizedCallback(entry.contentRect && entry.contentRect.width);
	});
});

class HmVisibilityEditor extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
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

	connectedCallback() {
		super.connectedCallback();
		ro.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		ro.unobserve(this);
	}

	render() {
		if (!this._hasAction('_updateDraft')) return;
		if (this._draftValue === undefined) {
			this._draftValue = this._isDraft;
		}

		return html`
		<d2l-switch-visibility
			?disabled="${!this.switchEnabled}"
			@change="${this._onChange}"
			?on="${!this._isDraft}"
			text-position="${this._textHidden ? 'hidden' : 'end'}">
		</d2l-switch-visibility>`;
	}

	resizedCallback(width) {
		this._textHidden = width < 140;
	}

	get switchEnabled() {
		return this._hasAction('_updateDraft') && !this.disabled;
	}

	_onChange() {
		this._draftValue = !this._draftValue;
		if (this._hasAction('_updateDraft')) {
			this._updateDraft.commit({draft: this._draftValue});
		}
	}

}

customHypermediaElement('d2l-hc-visibility-editor', HmVisibilityEditor);
