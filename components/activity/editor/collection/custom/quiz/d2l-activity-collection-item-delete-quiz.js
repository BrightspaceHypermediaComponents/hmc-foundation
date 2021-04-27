import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LitElement } from 'lit-element/lit-element.js';
import { LocalizeCollectionAdd } from '../../lang/localize-collection-add.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityCollectionItemDeleteQuiz extends SkeletonMixin(RtlMixin(HypermediaStateMixin(LocalizeCollectionAdd(LitElement)))) {
	static get properties() {
		return {
			_dialogOpened: { type: Boolean },
			_selectionCount: { type: Number, attribute: 'selection-count' }
		};
	}
	static get styles() {
		return [
			super.styles
		];
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
                    ?disabled="${this._selectionCount ? false : true}"
                    @click="${this._handleDialogOpen}">
                </d2l-button-subtle>
                <div class="dialog-div">
                    <d2l-dialog-confirm id="delete-confirmation-dialog"
                        ?opened="${this._dialogOpened}"
                        @d2l-dialog-close="${this._handleDialogClose}"
                        text=${this.localize('text-deleteConfirmationDialog')}>
                            <d2l-button slot="footer" primary data-dialog-action="yes" @click="${this._onDeleteSelectedContent}">${this.localize('button-deleteConfirmationDialogDelete')}</d2l-button>
                            <d2l-button slot="footer" data-dialog-action @click="${this._onCancelSelectedContent}">${this.localize('button-deleteConfirmationDialogCancel')}</d2l-button>
                    </d2l-dialog-confirm>
                </div>
            </div>
		`;
	}
	_handleDialogClose() {
		this._dialogOpened = false;
	}
	_handleDialogOpen() {
		this._dialogOpened = true;
		this.dispatchEvent(new CustomEvent('d2l-collection-item-delete-dialog-open', {bubbles: true, composed: true}));
	}
	_onCancelSelectedContent() {
		this.dispatchEvent(new CustomEvent('d2l-collection-item-delete-dialog-cancel', {bubbles: true, composed: true}));
	}
	_onDeleteSelectedContent() {
		this.dispatchEvent(new CustomEvent('d2l-collection-item-delete-dialog-confirm', {bubbles: true, composed: true}));
	}
}
customElements.define('d2l-activity-collection-item-delete-quiz', ActivityCollectionItemDeleteQuiz);
