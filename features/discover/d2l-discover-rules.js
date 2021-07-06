import '@brightspace-ui-labs/checkbox-drawer/checkbox-drawer.js';
import './d2l-discover-rule-card.js';
import './d2l-discover-rule-picker-dialog.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	selfAssignableClass: 'self-assignable',
	rule: 'https://discovery.brightspace.com/rels/rule',
	organization: 'https://api.brightspace.com/rels/organization',
	entitlementRules: 'https://discovery.brightspace.com/rels/entitlement-rules',
});

class EntitlementRules extends LocalizeDynamicMixin(SkeletonMixin(HypermediaStateMixin(LitElement))) {
	static get properties() {
		return {
			isSelfEnrollable: { type: Boolean, observable: observableTypes.classes,
				method: (classes) => classes.includes(rels.selfAssignableClass),
				route: [{observable: observableTypes.link, rel: rels.organization }] },
			_rules: { type: Array },
			_ruleIndex: { type: Number },
			_dialogOpened: { type: Boolean },
			_entitlementsHref: { observable: observableTypes.link, rel: rels.entitlementRules },
			_createEntitlement: { observable: observableTypes.action, name: 'create-entitlement-rules' },
			_getEntitlement: { observable: observableTypes.summonAction, name: 'entitlement-rules' }
		};
	}

	static get styles() {
		return [ super.styles, bodySmallStyles, css`
			h5.d2l-body-small {
				color: var(--d2l-color-ferrite);
				margin: 0.7rem 0;
			}
			h5.d2l-body-small + p {
				margin-top: 0;
			}
			d2l-button-subtle {
				margin-left: -0.65rem;
			}
		` ];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this.skeleton = true;
		this._rules = [];
	}

	render() {
		return html`
			<d2l-labs-checkbox-drawer
				?checked="${this.isSelfEnrollable || (this._rules && this._rules.length)}"
				label="${this.localize('label-checkbox')}"
				description="${this.localize('text-checkbox-description')}"
				class="d2l-skeletize"
				@d2l-checkbox-drawer-checked-change="${this._onCheckboxChange}">
			${this._rules && this._rules.length ? html`
			<div class="d2l-body-small d2l-enrollment-rules">
				<h5 class="d2l-body-small"><strong>${this.localize('text-rules')}</strong></h5>
				<p>${this.localize('text-rules-description')}</p>
				<!-- rules cards -->
				${this._rules.map((rule, index) => html`
					<d2l-discover-rule-card
						.token="${this.token}"
						.rule="${rule}"
						.ruleIndex="${index}"
						@d2l-rule-delete-click="${this._onRuleDeleted}"
						@d2l-rule-edit-click="${this._onRuleEdit}"></d2l-discover-rule-card>
				`)}
			</div>
			` : null}
			<d2l-button-subtle
				@click=${this._onButtonClick}
				id="add-enrollment-rule-button"
				text="${this._rules && this._rules.length ? this.localize('text-addmore-enrollment-rule') : this.localize('text-add-enrollment-rule')}"
				icon="${this._rules && this._rules.length ? 'tier1:plus-large-thick' : 'tier1:lock-locked'}"></d2l-button-subtle>
			<d2l-discover-rule-picker-dialog
				href="${this._entitlementsHref}"
				.token="${this.token}"
				?opened="${this._dialogOpened}"
				.ruleIndex="${this._ruleIndex}"
				.rules="${this._rules}"
				@d2l-dialog-close="${this._onDialogClose}"
				@d2l-rules-changed="${this._onRulesChanged}"
			></d2l-discover-rule-picker-dialog>
			</d2l-labs-checkbox-drawer>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('_getEntitlement')) {
			this._summonEntitlement();
		}
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_onButtonClick() {
		this._ruleIndex = undefined;
		this._dialogOpened = true;
	}

	_onCheckboxChange(e) {
		const checked = e.detail.checked;
		if (checked && this._rules.length) {
			// when the user re-checks the box, re-commit the entitlement
			this._onRulesChanged();
		} else {
			if (!this._hasAction('_createEntitlement')) return;
			// when the user unchecks the box, delete the entitlement, but don't update the rules
			this._createEntitlement.commit({
				rules: []
			});
		}
		// create a composed event so that we can catch it in the LMS
		// we use this method until there is a hypermedia action for changing discoverability on a course
		const event = new CustomEvent('d2l-rules-checkbox-change', {
			bubbles: true,
			composed: true,
			detail: {
				checked: e.detail.checked
			}
		});
		this.dispatchEvent(event);
	}

	_onDialogClose() {
		this._dialogOpened = false;
		this._ruleIndex = undefined;
	}

	_onRuleDeleted(e) {
		this._rules.splice(e.target.ruleIndex, 1);
		this._state.updateProperties({
			_rules: { observable: observableTypes.subEntities, rel: rels.rule, route: [
				{ observable: observableTypes.link, rel: rels.entitlementRules }
			], value: this._rules }
		});

		this.requestUpdate();
		// call it manually
		this._onRulesChanged();
	}

	_onRuleEdit(e) {
		this._ruleIndex = e.target.ruleIndex;
		this._dialogOpened = true;
	}

	_onRulesChanged() {
		if (!this._hasAction('_createEntitlement')) return;

		const message = this._rules.map(rule => {
			const ruleObj = {};
			rule.entities.forEach(condition => ruleObj[condition.properties.type] = condition.properties.values);
			return ruleObj;
		});
		this._createEntitlement.commit({
			rules: message
		});
	}

	/**
	 * @param { Array } oldRules
	 * @param { Array } newRules
	 * @returns { Boolean } true if changed, false if not
	 */
	_rulesHaveChanged(oldRules, newRules) {
		if (oldRules.length !== newRules.length) return true;
		// check each rule
		for (let i = 0; i < oldRules.length; ++i) {
			if (oldRules[i].entities.length !== newRules[i].entities.length) return true;
			// check each condition
			for (let j = 0; j < oldRules[i].entities.length; ++j) {
				const oldCondition = oldRules[i].entities[j];
				const newCondition = newRules[i].entities[j];
				if (oldCondition.properties.type !== newCondition.properties.type ||
					JSON.stringify(oldCondition.properties.values) !== JSON.stringify(newCondition.properties.values)
				) {
					return true;
				}
			}
		}
		return false;
	}

	async _summonEntitlement() {
		const sirenReponse = await this._getEntitlement.summon(null, true);
		if (sirenReponse) {
			const newRules = sirenReponse?.entities.filter(e => e.rel.includes(rels.rule));
			if (this._rulesHaveChanged(newRules, this._rules)) {
				this._rules = newRules;
				this._onRulesChanged();

				this._state.updateProperties({
					_rules: {
						type: Array,
						observable: observableTypes.subEntities,
						rel: rels.rule,
						value: this._rules
					}
				});
			}

			this._entitlementsHref = sirenReponse?.links.find(l => l.rel.includes('self')).href;
		}
	}

}
customElements.define('d2l-discover-rules', EntitlementRules);
