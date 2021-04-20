import '@brightspace-ui-labs/checkbox-drawer/checkbox-drawer.js';
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
			_rules: { type: Array, observable: observableTypes.subEntities, rel: rels.rule, route: [
				{ observable: observableTypes.link, rel: rels.entitlementRules }
			] },
			_dialogOpened: { type: Boolean },
			_entitlementsHref: { observable: observableTypes.link, rel: rels.entitlementRules },
			_createEntitlement: { observable: observableTypes.action, name: 'create', route: [
				{ observable: observableTypes.link, rel: rels.entitlementRules }
			]}
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
				?checked="${this.isSelfEnrollable || (this.rules && this.rules.length)}"
				label="${this.localize('label-checkbox')}"
				description="${this.localize('text-checkbox-description')}"
				class="d2l-skeletize">
			${this.rules && this.rules.length ? html`
			<div class="d2l-body-small d2l-enrollment-rules">
				<h5 class="d2l-body-small"><strong>${this.localize('text-rules')}</strong></h5>
				<p>${this.localize('text-rules-description')}</p>
				<!-- rules cards -->
			</div>
			` : null}
			<d2l-button-subtle
				@click=${this._onButtonClick}
				id="add-enrollment-rule-button"
				text="${this.localize('text-add-enrollment-rule')}"
				icon="tier1:lock-locked"></d2l-button-subtle>
			<d2l-discover-rule-picker-dialog
				@d2l-dialog-close="${this._onDialogClose}"
				href="${this._entitlementsHref}"
				token="${this.token}"
				?opened="${this._dialogOpened}"
			></d2l-discover-rule-picker-dialog>
			</d2l-labs-checkbox-drawer>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (this._loaded && changedProperties.has('_rules') && changedProperties.get('_rules') !== undefined) {
			this._onRulesChanged();
		}
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_onButtonClick() {
		this._dialogOpened = true;
	}

	_onDialogClose() {
		this._dialogOpened = false;
	}

	_onRulesChanged() {
		if (!this._hasAction('_createEntitlement')) return;

		this._createEntitlement.commit(JSON.stringify(this._rules.map(rule => {
			const ruleObj = {};
			rule.entities.forEach(condition => ruleObj[condition.properties.type] = condition.properties.values);
			return ruleObj;
		})));
	}

}
customElements.define('d2l-discover-rules', EntitlementRules);
