import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-discover-attribute-picker.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { classMap } from 'lit-html/directives/class-map';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

const rels = Object.freeze({
	rule: 'https://discovery.brightspace.com/rels/rule',
	condition: 'https://discovery.brightspace.com/rels/condition',
	conditionType: 'https://discovery.brightspace.com/rels/condition-type',
	conditionTypes: 'https://discovery.brightspace.com/rels/entitlement/condition-types'
});

class RulePicker extends LocalizeDynamicMixin(HypermediaStateMixin(RtlMixin(LitElement))) {

	static get properties() {
		return {
			ruleIndex: { type: Number, attribute: 'rule-index' },
			_conditionTypes: { type: Array, observable: observableTypes.subEntities, rel: rels.conditionType, route: [
				{ observable: observableTypes.link, rel: rels.conditionTypes }
			] },
			_rules: { type: Array, observable: observableTypes.subEntities, rel: rels.rule, verbose: true },
			_conditions: { type: Array },
			_defaultType: { type: String },
		};
	}

	static get styles() {
		return [ bodyCompactStyles, selectStyles,
			css`
				.d2l-picker-rule-container {
					align-items: center;
					display: flex;
					justify-content: center;
					margin-bottom: 1rem;
					margin-top: 1rem;
				}
				.d2l-picker-rule-container-final {
					margin-bottom: 6rem;
				}
				.d2l-picker-rule-attribute-picker {
					flex-grow: 1;
				}
				.d2l-picker-rule-separator {
					margin: 0 0.5rem 0 0.5rem;
				}
				.d2l-picker-and {
					display: flex;
					margin-bottom: 0.5rem;
				}
				.d2l-picker-hr {
					align-self: center;
					border-bottom: 1px solid var(--d2l-color-mica);
					height: 0;
				}
				.d2l-picker-hr-condition-separator {
					margin-left: 1rem;
					width: 100%;
				}
				.d2l-picker-hr-match-separator {
					margin-bottom: 1rem;
					margin-top: 1rem;
				}
				[hidden] {
					display: none !important;
				}
			`,
		];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this._rules = [];
		this._conditions = [];
		this._conditionTypesHash = {};
		this._existingConditions = [];
	}

	render() {
		return html`
			${this._renderPickerConditions()}
			<d2l-button-subtle id="add-another-condition-button"
				text="${this.localize('text-add-another-condition')}"
				icon="tier1:plus-default"
				@click="${this._addDefaultCondition}"></d2l-button-subtle>
			<div class="d2l-picker-hr-match-separator">
				<div class="d2l-picker-hr"></div>
				<div class="d2l-body-compact">${this.localize('text-rule-matches', 'count', 'xxx')}</div>
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('_conditionTypes')) {
			this._buildConditionTypeHash();
			// set the default condition type even if this resolves second
			if (this._conditions && this._conditions.length && !this._conditions[0].properties.type) {
				this._conditions[0].properties.type = this.defaultType = this._conditionTypes[0].properties.type;
			}
		}
		if (changedProperties.has('_conditions') && this._conditions.length === 0) {
			this._addDefaultCondition();
		}
	}

	async reload(newConditions) {
		this._conditions = newConditions;
		await this.updateComplete;

		if (!this._conditions || this._conditions.length === 0) {
			this._addDefaultCondition();
		}
	}

	_addDefaultCondition() {
		this._conditions.push({
			properties: {
				type: this.defaultType || (this._conditionTypes && this._conditionTypes[0].properties.type),
				values: []
			}
		});
		this.requestUpdate();

		this.dispatchEvent(new CustomEvent('d2l-rule-condition-added', {
			bubbles: true,
			composed: true
		}));
	}

	_buildConditionTypeHash() {
		this._conditionTypesHash = {};
		this._conditionTypes.forEach(conditionType => {
			this._conditionTypesHash[conditionType.properties.type] = conditionType;
		});
	}

	_getConditionTypeHref(condition) {
		if (this._conditionTypesHash[condition.properties.type]) {
			return this._conditionTypesHash[condition.properties.type].href;
		}
		return '';
	}

	_isLastCondition(condition) {
		return this._conditions[this._conditions.length - 1] === condition;
	}

	_isOnlyCondition() {
		return this._conditions?.length === 1;
	}

	_onConditionSelectChange(e) {
		const condition = e.target.condition;

		if (condition.properties.type !== e.target.value) {
			condition.properties.type = e.target.value;
		}

		this.requestUpdate();
	}

	_onConditionValueChange(e) {
		const condition = e.target.condition;
		condition.properties.values = e.detail.attributeList;
	}

	_removeCondition(e) {
		const condition = e.target.condition;

		const index = this._conditions.indexOf(condition);
		if (index > -1) {
			this._conditions.splice(index, 1);
			this.requestUpdate();
		}
	}

	_renderPickerConditions() {

		return html`
		${this._conditions.map((condition, index) => {
		const classes = {
			'd2l-picker-rule-container': true,
			'd2l-picker-rule-container-final': this._conditions.length - 1 === index
		};
		return html`
		<div class="${classMap(classes)}">
			<select class="d2l-input-select picker-rule-select"
				aria-label="${this.localize('label-condition-type')}"
				.condition="${condition}"
				value="${condition.properties.type}"
				@blur="${this._onConditionSelectChange}">
				${this._conditionTypes ? this._conditionTypes.map(conditionType => html`
					<option value="${conditionType.properties.type}" ?selected="${condition.properties.type === conditionType.properties.type}">${conditionType.properties.type}</option>
				`) : null}
			</select>
			<div class="d2l-picker-rule-separator d2l-body-compact">
				${this.localize('text-condition-is')}
			</div>
			<d2l-discover-attribute-picker
				href="${this._getConditionTypeHref(condition)}"
				.token="${this.token}"
				.attributeList="${condition.properties.values}"
				class="d2l-picker-rule-attribute-picker"
				.condition="${condition}"
				@d2l-attributes-changed="${this._onConditionValueChange}">
			</d2l-discover-attribute-picker>
			<d2l-button-icon
				class="delete-condition-button"
				?hidden=${this._isOnlyCondition()}
				text="${this.localize('text-remove-condition', 'conditionType', condition.properties.type)}"
				icon="tier1:close-default"
				.condition="${condition}"
				@click="${this._removeCondition}"></d2l-button-icon>
		</div>
		<div class="d2l-picker-and d2l-body-compact" ?hidden="${this._isLastCondition(condition)}">
			${this.localize('text-and')}
			<div class="d2l-picker-hr d2l-picker-hr-condition-separator"></div>
		</div>
		`;
	})}`;
	}
}

customElements.define('d2l-discover-rule-picker', RulePicker);
