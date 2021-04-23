import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeCollectionAdd } from '../../lang/localize-collection-add.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityCollectionItemDeleteQuiz extends SkeletonMixin(RtlMixin(HypermediaStateMixin(LocalizeCollectionAdd(LitElement)))) {
	static get properties() {
		return {
			_dialogOpened: { type: Boolean },
		};
	}
	static get styles() {
		return [
			super.styles,
			css`
                :host {
                    display: block;
                    position: relative;
                }
                :host([hidden]) {
                    display: none;
                }
                `];
	}

	constructor() {
		super();
		this._dialogOpened = false;
	}

	render() {
		return html`
            <div class="d2l-skeletize">
                <d2l-button-subtle
                    text="${this.localize('button-quizEditorDelete')}"
                    icon="tier1:delete"
                    @click="${this._handleDialogOpen}">
                </d2l-button-subtle>
            </div>
            <div class="dialog-div">
                <d2l-dialog-confirm id="delete-confirmation-dialog"
                    ?opened="${this._dialogOpened}"
                    @d2l-dialog-close="${this._handleDialogClose}"
                    text=${this.localize('text-deleteConfirmationDialog')}>
                        <d2l-button slot="footer" primary data-dialog-action="yes" @click="${this._onDeleteSelectedContent}">${this.localize('button-deleteConfirmationDialogDelete')}</d2l-button>
                        <d2l-button slot="footer" data-dialog-action>${this.localize('button-deleteConfirmationDialogCancel')}</d2l-button>
                </d2l-dialog-confirm>
            </div>
		`;
	}
	_handleDialogClose() {
		this._dialogOpened = false;
	}
	_handleDialogOpen() {
		this._dialogOpened = true;
	}
	_onDeleteSelectedContent() {
		this.dispatchEvent(new CustomEvent('d2l-delete-quiz-collection-items', {bubbles: true, composed: true }));
	}
}
customElements.define('d2l-activity-collection-item-delete-quiz', ActivityCollectionItemDeleteQuiz);
