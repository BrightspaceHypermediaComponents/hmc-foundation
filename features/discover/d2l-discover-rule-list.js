import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-context-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import './d2l-discover-rule-picker-dialog.js';
import './d2l-discover-rule-card-match-info.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

//Simple list for displaying non-interactable rules
class RuleList extends LocalizeDynamicMixin(RtlMixin(LitElement)) {
	static get properties() {
		return {
			rules: { type: Array },
			token: { type: String },
		};
	}

	static get styles() {
		return css`
			.d2l-rule-list-item {
				max-width: 25rem;
			}

			.d2l-rule-list-item-content {
				margin: 0.3rem 0 0.3rem 0.8rem;
			}

			.d2l-rule-list-title {
				color: var(--d2l-color-ferrite);
				font-weight: 600;
				font-size: 0.8rem;
				margin-bottom: 0.8rem;
			}
		`;
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	render() {
		return html`
			<d2l-list>
				${this.rules.map((rule) => html`
					<d2l-list-item class="d2l-rule-list-item">
						<div class="d2l-rule-list-item-content">
							<div class="d2l-rule-list-title">${this._getTitle(rule)}</div>
							<d2l-discover-rule-card-match-info token="${this.token}" .rule="${rule}"></d2l-discover-rule-card-match-info>
						</div>
					</d2l-list-item>
				`)}
			</d2l-list>
		`;
	}

	_getTitle(rule) {
		const conditions = rule.entities;
		let title = '';
		for (let i = 0; i < conditions.length; i++) {
			const condition = conditions[i];
			title += `${condition.properties.type}: `;
			const attrList = condition.properties.values;
			for (let j = 0; j < attrList.length; j++) {
				const attr = attrList[j];
				title += attr;
				if (j !== attrList.length - 1) {
					title += ', ';
				}
			}
			if (i !== conditions.length - 1) {
				title += ' & ';
			}
		}
		return title;
	}
}

customElements.define('d2l-discover-rule-list', RuleList);
