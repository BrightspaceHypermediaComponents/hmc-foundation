import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-context-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const rels = Object.freeze({
	rule: 'https://discovery.brightspace.com/rels/rule'
});

class RuleCard extends HypermediaStateMixin(RtlMixin(LitElement)) {
	static get properties() {
		return {
			ruleIndex: { type: Number, attribute: 'rule-index' },
			_rules: { type: Array, observable: observableTypes.subEntities, rel: rels.rule },
			_conditions: { type: Array }
		};
	}

	static get styles() {
		return css`
			.d2l-rule-card {
				display: block;
				border: 1px solid var(--d2l-color-mica);
				margin-bottom: 0.4rem;
				max-width: 25rem;
			}

			.d2l-rule-card-title {
				color: var(--d2l-color-ferrite);
				font-weight: 600;
				font-size: 0.8rem;
				margin: -0.4rem 0 0.8rem 0;
			}

			.d2l-rule-card-profiles {
				border: 1px solid black;
				display: inline-block;
				margin-right: 16px;
			}

			.d2l-rule-card-match-users {
				font-size: 0.7rem;
				font-weight: 300;
				color: var(--d2l-color-tungsten);
				display: inline-block;
			}
			d2l-dropdown-context-menu {
				margin: -0.3rem -0.3rem 0 0;
			}
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		// if (changedProperties.has('_rules')) {
		// 	if (!this._rules || !this._rules.length || this.ruleIndex === undefined) {
		// 		this._conditions = undefined;
		// 		return;
		// 	}
		// 	console.log('set conditions');
		// 	this._setConditions();
		// }
	}

	render() {
		console.log('card', this.ruleIndex, this._rules);
		// let title = '';
		// if (this.conditions) {
		// 	for (let i = 0; i < this.conditions.length; i++) {
		// 		const condition = this.conditions[i];
		// 		title += `${condition.properties.type}: `;
		// 		const attrList = condition.properties.values;
		// 		for (let j = 0; j < attrList.length; j++) {
		// 			const attr = attrList[j];
		// 			title += attr;
		// 			if (j != attrList.length - 1) {
		// 				title += ', '
		// 			}
		// 		}
		// 		if (i != this.conditions.length - 1) {
		// 			title += ' & '
		// 		}
		// 	}
		// }
		return html`<div>Rule</div>`;
		// return html`
		// 	<d2l-card class="d2l-rule-card">
		// 		<div slot="content">
		// 			<div>
		// 				<div class="d2l-rule-card-title">${title}</div>
		// 				<div class="d2l-rule-card-profiles">Fancy Pictures</div>
		// 				<div class="d2l-rule-card-match-users">Matches X users</div>
		// 			</div>
		// 		</div>
		// 		<d2l-dropdown-context-menu text="options" slot="actions">
		// 			<d2l-dropdown-menu id="dropdown">
		// 				<d2l-menu label="options">
		// 					<d2l-menu-item text="Edit" @click="${this._onEditClick}"></d2l-menu-item>
		// 					<d2l-menu-item text="Delete" @click="${this._onDeleteClick}"></d2l-menu-item>
		// 				</d2l-menu>
		// 			</d2l-dropdown-menu>
		// 		</d2l-dropdown-context-menu>
		// 	</d2l-card>
		// `;
	}

	// _onDeleteClick() {
	// 	console.log('delete');
	// 	//this._rules.splice(this.ruleIndex, 1);
	// 	this._state.updateProperties({
	// 		_rules: { type: Array, observable: observableTypes.subEntities, rel: rels.rule, value: this._rules }
	// 	});
	// }

	// _onEditClick() {

	// }

	// _setConditions() {
	// 	console.log('card', this._rules, this.ruleIndex, this._rules.length);
	// 	if (this.ruleIndex < 0 || this.ruleIndex > this._rules.length - 1) {
	// 		this.conditions = undefined;
	// 		return;
	// 	}

	// 	this.conditions = this._rules[this.ruleIndex].entities;
	// }
}

customElements.define('d2l-discover-rule-card', RuleCard);
