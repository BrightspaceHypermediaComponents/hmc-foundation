import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import './d2l-discover-entitlement-rule-picker.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDiscoverEntitlement } from './lang/localization.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const rels = Object.freeze({
	condition: 'condition',
	updateCondions: 'update-conditions',
});

class RulePickerDialog extends LocalizeDiscoverEntitlement(HypermediaStateMixin(RtlMixin(LitElement))) {
	static get properties() {
		return {
			opened: { type: Boolean },
			conditions: { type: Array, observable: observableTypes.subEntities, rel: rels.condition },
			creating: { type: Boolean, observable: observableTypes.classes, method: classes => classes.includes('creating') },
			updateConditions: { observable: observableTypes.action, name: rels.updateCondions }
		};
	}

	static get styles() {
		return css`
			.d2l-rule-picker-area {
				height: 100%;
			}
		`;
	}

	constructor() {
		super();
		this.conditionTypes = [];
		this.conditions = [];
		this._copiedConditions = [];
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('opened')) {
			this._copyConditions();
		}
	}

	render() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				title-text="${this.creating ? this.localize('addEnrollmentRuleHeader') : this.localize('editEnrollmentRuleHeader')}">
				<div class="d2l-rule-picker-area">${this.localize('pickerSelectConditions')}</div>
				<d2l-discover-entitlement-rule-picker
					href="${this.href}"
					.token="${this.token}"
					@d2l-rule-condition-added="${this._onConditionAdded}"
					>
				</d2l-discover-entitlement-rule-picker>
				<d2l-button @click="${this._onDoneClick}" slot="footer" primary data-dialog-action="done">Done</d2l-button>
				<d2l-button @click="${this._onCancelClick}" slot="footer" data-dialog-action>Cancel</d2l-button>
			</d2l-dialog>
		`;
	}

	_onConditionAdded() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	_copyConditions() {
		this._copiedConditions = this.conditions.map(condition => {
			return {...condition};
		});
	}

	_onCancelClick() {
		this.conditions = this._copiedConditions;
		this.requestUpdate().then(() => {
			const picker = this.shadowRoot.querySelector('d2l-discover-entitlement-rule-picker');
			picker.reload(this.conditions);
		});
	}

	_onDoneClick() {
		const picker = this.shadowRoot.querySelector('d2l-discover-entitlement-rule-picker');
		this._state.updateProperties({
			conditions: {
				observable: observableTypes.subEntities,
				rel: rels.condition,
				value: picker.conditions
			}
		});
		// action is commited differently because it's a JSON string
		this.updateConditions.commit({
			conditions: JSON.stringify(this.conditions.map(condition => {
				return { type: condition.properties.type, value: condition.properties.value };
			}))
		});
	}
}

customElements.define('d2l-discover-rule-picker-dialog', RulePickerDialog);
