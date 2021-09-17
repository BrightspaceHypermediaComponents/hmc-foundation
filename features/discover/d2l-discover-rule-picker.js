import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-discover-attribute-picker.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { hide, show } from '@brightspace-ui/core/directives/animate/animate.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { classMap } from 'lit-html/directives/class-map';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { MatchCountMixin } from './mixins/match-count-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

const rels = Object.freeze({
	condition: 'https://discovery.brightspace.com/rels/condition',
	conditionType: 'https://discovery.brightspace.com/rels/condition-type',
	conditionTypes: 'https://discovery.brightspace.com/rels/condition-types'
});

const conditionStates = Object.freeze({
	new: 'new',
	existing: 'existing',
	remove: 'remove',
	removed: 'removed'
});
class RulePicker extends MatchCountMixin(LocalizeDynamicMixin(HypermediaStateMixin(RtlMixin(LitElement)))) {
	static get properties() {
		return {
			conditions: { type: Array },
			ruleIndex: { type: Number, attribute: 'rule-index' },
			_conditionTypes: { type: Array, observable: observableTypes.subEntities, rel: rels.conditionType, route: [
				{ observable: observableTypes.link, rel: rels.conditionTypes }
			] },
			rules: { type: Array },
			_defaultType: { type: String },
			_matchCount: { type: Number },
			_getMatchCount: { observable: observableTypes.summonAction, name: 'match-count' }
		};
	}

	static get styles() {
		return [ bodyCompactStyles, selectStyles,
			css`
				.d2l-relative-parent {
					position: relative;
				}
				.d2l-picker-rule-container {
					align-items: center;
					display: flex;
					justify-content: center;
					margin-bottom: 1rem;
					margin-top: 1rem;
				}
				.d2l-picker-rule-match-count {
					height: 1rem;
				}
				#add-another-condition-button {
					margin-top: 6rem;
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
		this.rules = [];
		this.conditions = [];
		this._conditionTypesHash = {};
		this._cleaningAnimState = false;
		this._matchCount = null;
	}

	render() {
		return html`
			<div class="d2l-relative-parent">
				${this._renderPickerConditions()}
				<d2l-button-subtle id="add-another-condition-button"
					text="${this.localize('text-add-another-condition')}"
					icon="tier1:plus-default"
					@click="${this._addDefaultCondition}"></d2l-button-subtle>
				<div class="d2l-picker-hr-match-separator">
					<div class="d2l-picker-hr"></div>
						<div class="d2l-picker-rule-match-count d2l-body-compact">
							${this._matchCount !== null ? html`${this.localize('text-rule-matches', 'count', this._matchCount)}` : null}
						</div>
					</div>
				</div>
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('_conditionTypes')) {
			this._buildConditionTypeHash();
			// set the default condition type even if this resolves second
			if (this.conditions && this.conditions.length && !this.conditions[0].properties.type) {
				this.conditions[0].properties.type = this.defaultType = this._conditionTypes[0].properties.type;
				this.conditions[0].properties.id = this._getConditionTypeId(this.conditions[0]);
			}
		}
		if (changedProperties.has('conditions') && this.conditions.length === 0) {
			this._addCondition(conditionStates.existing);
		}
		if (changedProperties.has('ruleIndex')) {
			this._setExistingConditions();
			this._updateMatchCount();
			this._sizeChanged();
		}

		const conditionOrgUnitIDList = this.shadowRoot.querySelectorAll('select');
		if (conditionOrgUnitIDList.length > 1) {
			const lastOrgUnitID = conditionOrgUnitIDList[conditionOrgUnitIDList.length - 1];
			lastOrgUnitID.focus();
		}
	}

	reload(newConditions) {
		this.ruleIndex = undefined;
		this.conditions = newConditions;
		this._matchCount = null;
		if (!this.conditions || this.conditions.length === 0) {
			this._addDefaultCondition();
		}
	}

	_addCondition(state = conditionStates.new) {
		this.conditions.push({
			properties: {
				type: this.defaultType || (this.conditionTypes && this.conditionTypes[0].properties.type),
				id: this._conditionTypesHash[this.defaultType] || (this.conditionTypes && this.conditionTypes[0].properties.id),
				values: [],
				state: state
			}
		});
		this.requestUpdate();
		this._sizeChanged();
	}

	_addDefaultCondition() {
		this._addCondition();
	}

	_buildConditionTypeHash() {
		this._conditionTypesHash = {};
		this._conditionTypes.forEach(conditionType => {
			this._conditionTypesHash[conditionType.properties.type] = conditionType;
		});
	}

	_getConditionTypeHref(condition) {
		return this._conditionTypesHash[condition.properties.type] ? this._conditionTypesHash[condition.properties.type].href : '';
	}

	_getConditionTypeId(condition) {
		return this._conditionTypesHash[condition.properties.type] ? this._conditionTypesHash[condition.properties.type].id : '';
	}

	_isFirstCondition(condition) {
		return this.conditions[0] === condition;
	}

	_isOnlyCondition() {
		return this.conditions?.length === 1;
	}

	async _onConditionAnimateEnd(e) {
		const condition = e.target.condition;
		if (condition.properties.state === conditionStates.removed) {
			const index = this.conditions.indexOf(e.target.condition);
			this.conditions.splice(index, 1);
			this.requestUpdate();

			await this.updateComplete;
			const ruleElems = this.shadowRoot.querySelectorAll('.d2l-picker-rule-animator');
			if (ruleElems.length > index) {
				this._cleaningAnimState = true;
				this.conditions[index].properties.state = conditionStates.new;
				this.requestUpdate();
			}
			this._sizeChanged();
		}
	}

	_onConditionSelectChange(e) {
		const condition = e.target.condition;

		if (condition.properties.type !== e.target.value) {
			condition.properties.type = e.target.value;
			condition.properties.values = [];
			condition.properties.id = this._conditionTypesHash[condition.properties.type].properties.id;
			e.target.parentElement.querySelector('d2l-discover-attribute-picker').focus();
			this._updateMatchCount();
		}
		this.requestUpdate();
	}

	_onConditionValueChange(e) {
		const condition = e.target.condition;
		condition.properties.values = e.detail.attributeList;
		this._sizeChanged();
		this._updateMatchCount();
	}

	_removeCondition(e) {
		const condition = e.target.condition;
		const index = this.conditions.indexOf(condition);
		if (index > -1) {
			this.requestUpdate();
			condition.properties.state = conditionStates.remove;
			this._updateMatchCount();
		}
	}

	_renderPickerConditions() {

		return html`
		${this.conditions.map((condition) => {
		let animateAction = undefined;
		if (condition.properties.state === conditionStates.remove) {
			condition.properties.state = conditionStates.removed;
			animateAction = hide();
		} else if (condition.properties.state === conditionStates.new) {
			condition.properties.state = conditionStates.existing;
			animateAction = show({ skip: this._cleaningAnimState });
			this._cleaningAnimState = false;
		}
		const classes = {
			'd2l-picker-rule-container': true
		};
		return html`
			<div class="d2l-picker-rule-animator" .animate="${animateAction}" @d2l-animate-complete="${this._onConditionAnimateEnd}" .condition="${condition}">
				<div class="d2l-picker-and d2l-body-compact" ?hidden="${this._isFirstCondition(condition)}">
					${this.localize('text-and')}
					<div class="d2l-picker-hr d2l-picker-hr-condition-separator"></div>
				</div>
				<div class="${classMap(classes)}">
					<select class="d2l-input-select picker-rule-select"
						aria-label="${this.localize('label-condition-type')}"
						.condition="${condition}"
						value="${condition.properties.type}"
						@change="${this._onConditionSelectChange}">
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
			</div>
			`;
	})}`;
	}

	async _setExistingConditions() {
		if (!this._loaded) await this._state.allFetchesComplete();

		if (this.ruleIndex === undefined || this.ruleIndex + 1 > this.rules.length || this.ruleIndex < 0) {
			this.conditions = [];
			return;
		}
		const rule = this.rules[this.ruleIndex];
		this.conditions = rule.entities.map(condition => {
			return {
				properties: {
					id: condition.properties.id,
					type: condition.properties.type,
					state: conditionStates.existing,
					values: [...condition.properties.values]
				}
			};
		});
		await this.updateComplete;
		this._sizeChanged();
	}

	_sizeChanged() {
		this.dispatchEvent(new CustomEvent('d2l-rule-condition-size-changed', {
			bubbles: true,
			composed: true
		}));
	}

	async _updateMatchCount() {
		this._matchCount = null;
		const matchData = await this.getMatchData(this._getMatchCount, this.conditions, true, 3);
		this._matchCount = matchData !== null ? matchData.count : null;
		this._userList = matchData !== null ? matchData.users : null;
	}
}

customElements.define('d2l-discover-rule-picker', RulePicker);
