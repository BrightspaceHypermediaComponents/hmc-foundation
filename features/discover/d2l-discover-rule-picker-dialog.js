import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import './d2l-discover-rule-picker.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const rels = Object.freeze({
	rule: 'https://discovery.brightspace.com/rels/rule'
});

class RulePickerDialog extends LocalizeDynamicMixin(HypermediaStateMixin(RtlMixin(LitElement))) {
	static get properties() {
		return {
			ruleIndex: { type: Number },
			rules: { type: Object },
			opened: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			.d2l-rule-picker-area {
				height: 100%;
			}
		`;
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this.rules = [];
	}

	render() {
		return html`
			<d2l-dialog
				width="845"
				?opened="${this.opened}"
				title-text="${this.ruleIndex === undefined ? this.localize('text-add-enrollment-rule') : this.localize('text-edit-enrollment-rule')}">
				<div class="d2l-rule-picker-area">${this.localize('text-select-conditions')}</div>
				<d2l-discover-rule-picker
					href="${this.href}"
					.token="${this.token}"
					.ruleIndex="${this.ruleIndex}"
					@d2l-rule-condition-size-changed="${this._onConditionModified}">
				</d2l-discover-rule-picker>
				<d2l-button @click="${this._onDoneClick}" slot="footer" primary data-dialog-action="done">${this.localize('button-done')}</d2l-button>
				<d2l-button @click="${this._onCancelClick}" slot="footer" data-dialog-action>${this.localize('button-cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	async _onCancelClick() {
		await this.updateComplete;

		if (this.ruleIndex === undefined) {
			const picker = this.shadowRoot.querySelector('d2l-discover-rule-picker');
			picker.reload([]);
		}
	}

	_onConditionModified() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	_onDoneClick() {
		const picker = this.shadowRoot.querySelector('d2l-discover-rule-picker');
		if (this.ruleIndex === undefined) {
			// create
			this.rules.push({
				entities: [...picker.conditions],
				properties: {
					matchCount: picker._matchCount,
					userList: picker._userList,
				},
				rel: [rels.rule]
			});
			picker.reload([]);
		} else {
			// edit
			this.rules[this.ruleIndex] = {
				entities: [...picker.conditions],
				properties: {
					matchCount: picker._matchCount,
					userList: picker._userList,
				},
				rel: [rels.rule]
			};
		}
		this._state.updateProperties({
			rules: {
				type: Array,
				observable: observableTypes.subEntities,
				rel: rels.rule,
				value: this.rules
			}
		});
	}
}

customElements.define('d2l-discover-rule-picker-dialog', RulePickerDialog);
