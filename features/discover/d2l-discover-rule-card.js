import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-context-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class RuleCard extends HypermediaStateMixin(RtlMixin(LitElement)) {
	static get properties() {
		return {
			conditions: { type: Array }
		};
	}

	static get styles() {
		return css`
			.d2l-rule-card {
				border: 1px solid var(--d2l-color-mica);
				width: 500px;
			}

			.d2l-rule-card-title {
				font-weight: 600;
				font-size: 0.8rem;
				margin-bottom: 16px;
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
		`;
	}

	async updated() {
		const card = this.shadowRoot.querySelector('d2l-card');
		await card.updateComplete;
		const content = card.shadowRoot.querySelector('.d2l-card-content');
		if (content) {
			content.style.padding = '16px';
		}
		const footer = card.shadowRoot.querySelector('.d2l-card-footer');
		if (footer) {
			footer.style.paddingTop = '0';
		}
		const actions = card.shadowRoot.querySelector('.d2l-card-actions');
		if (actions) {
			actions.style.right = '0.3rem';
			actions.style.top = '0.3rem';
		}
	}

	render() {
		let title = '';
		if (this.conditions) {
			for (let i = 0; i < this.conditions.length; i++) {
				const condition = this.conditions[i];
				title += `${condition.properties.type}: `;
				const attrList = condition.properties.values;
				for (let j = 0; j < attrList.length; j++) {
					const attr = attrList[j];
					title += attr;
					if (j != attrList.length - 1) {
						title += ', '
					}
				}
				if (i != this.conditions.length - 1) {
					title += ' & '
				}
			}
		}

		return html`
			<d2l-card class="d2l-rule-card">
				<div slot="content">
					<div>
						<div class="d2l-rule-card-title">${title}</div>
						<div class="d2l-rule-card-profiles">Fancy Pictures</div>
						<div class="d2l-rule-card-match-users">Matches 183 users</div>
					</div>
				</div>
				<d2l-dropdown-context-menu text="options" slot="actions">
					<d2l-dropdown-menu id="dropdown">
						<d2l-menu label="options">
							<d2l-menu-item text="Edit"></d2l-menu-item>
							<d2l-menu-item text="Delete"></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown-context-menu>
			</d2l-card>
		`;
	}
}

customElements.define('d2l-discover-rule-card', RuleCard);
