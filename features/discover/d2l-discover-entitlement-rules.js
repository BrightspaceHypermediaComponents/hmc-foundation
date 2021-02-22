import '@brightspace-ui-labs/checkbox-drawer/checkbox-drawer.js';
import '@brightspace/discover-components/components/rule-picker-dialog.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeDiscoverEntitlement } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	selfAssignableClass: 'self-assignable',
	rule: 'rule',
	entitlementRules: 'entitlement-rules',
	conditionType: 'condition-type',
	conditionTypes: 'available-condition-types'
});

class EntitlementRules extends LocalizeDiscoverEntitlement(SkeletonMixin(HypermediaStateMixin(LitElement))) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property },
			isSelfEnrollable: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes(rels.selfAssignableClass) },
			// rules: { observable: observableTypes.subEntities, rel: rels.rule, route: [
			// 	{ observable: observableTypes.link, rel: rels.entitlementRules }
			// ] },
			conditionTypes: { observable: observableTypes.subEntities, rel: rels.conditionType, route: [
				{ observable: observableTypes.link, rel: rels.conditionTypes }
			]}
		};
	}

	static get styles() {
		return [ super.styles, bodySmallStyles, css`
			h4.d2l-body-small,
			h5.d2l-body-small {
				color: var(--d2l-color-ferrite);
				margin: 0.7rem 0;
			}
			h5.d2l-body-small + p {
				margin-top: 0;
			}
		` ];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	render() {
		const typeList = this.conditionTypes?.map(conditionType => conditionType.properties.type);
		return html`
			<h4 class="d2l-body-small d2l-skeletize"><strong>${this.localize('text-title')}</strong></h4>
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
			${typeList ? html`
			<rule-picker-dialog
				@rule-conditions-changed="${this._onRuleConditionsChanged}"
				.conditionTypes="${typeList}"
				default="${typeList[0]}"
			></rule-picker-dialog>
			` : null }
			</d2l-labs-checkbox-drawer>
		`;
	}

	_onRuleConditionsChanged() {
		//todo: change the state from within the component instead of catching this event
	}

}
customElements.define('d2l-discover-entitlement-rules', EntitlementRules);
