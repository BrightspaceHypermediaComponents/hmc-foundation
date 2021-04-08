import '@brightspace-ui-labs/checkbox-drawer/checkbox-drawer.js';
import './d2l-discover-rule-picker-dialog.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	selfAssignableClass: 'self-assignable',
	rule: 'rule',
	entitlementRules: 'entitlement-rules',
	conditionType: 'condition-type',
	newRule: 'new-rule'
});

class EntitlementRules extends LocalizeDynamicMixin(SkeletonMixin(HypermediaStateMixin(LitElement))) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property },
			isSelfEnrollable: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes(rels.selfAssignableClass) },
			// rules: { observable: observableTypes.subEntities, rel: rels.rule, route: [
			// 	{ observable: observableTypes.link, rel: rels.entitlementRules }
			// ] },
			_dialogOpened: { type: Boolean },
			_newRuleHref: { observable: observableTypes.link, rel: rels.newRule, route: [
				{ observable: observableTypes.link, rel: rels.entitlementRules }
			] },
			// _addNewRule: { observable: observableTypes.action, name: "add-new-rule", route: [
			// 	{ observable: observableTypes.link, rel: rels.entitlementRules }
			// ]}
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
	}

	render() {
		return html`
			<d2l-labs-checkbox-drawer
				@d2l-checkbox-drawer-checked-change="${this._onCheckboxChange}"
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
				@d2l-discover-rule-created="${this._onRuleCreated}"
				@d2l-dialog-close="${this._onDialogClose}"
				href="${this._newRuleHref}"
				token="${this.token}"
				?opened="${this._dialogOpened}"
			></d2l-discover-rule-picker-dialog>
			</d2l-labs-checkbox-drawer>
		`;
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

	_onCheckboxChange(e) {
		if (e.detail.checked) {
			// todo: commit action to make discoverable
		} else {
			// todo: commit action to make not discoverable
		}
	}

	_onDialogClose() {
		this._dialogOpened = false;
	}

	_onRuleCreated() {
		// todo: commit action to make not discoverable AND create entitlement
	}

}
customElements.define('d2l-discover-rules', EntitlementRules);
