import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-context-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import './d2l-discover-rule-picker-dialog.js';
import './d2l-discover-rule-card-match-info.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

// there is a bug in the engine so this is a dumb component instead of a hypermedia one
class RuleCard extends LocalizeDynamicMixin(RtlMixin(LitElement)) {
	static get properties() {
		return {
			rule: { type: Object },
			token: { type: String },
			_title: { type: String },
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
			d2l-dropdown-menu {
				margin-top: -0.3rem;
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
			<d2l-card class="d2l-rule-card">
				<div slot="content">
					<div>
						<div class="d2l-rule-card-title">${this._title}</div>
						<d2l-discover-rule-card-match-info token="${this.token}" .rule="${this.rule}"></d2l-discover-rule-card-match-info>
					</div>
				</div>
				<d2l-dropdown-context-menu text="options" slot="actions">
					<d2l-dropdown-menu>
						<d2l-menu label="options">
							<d2l-menu-item text="${this.localize('text-edit')}" @click="${this._onEditClick}"></d2l-menu-item>
							<d2l-menu-item text="${this.localize('text-delete')}" @click="${this._onDeleteClick}"></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown-context-menu>
			</d2l-card>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('rule')) {
			this._setTitle();
		}
	}

	_onDeleteClick() {
		const event = new CustomEvent('d2l-rule-delete-click', {
			bubbles: true
		});
		this.dispatchEvent(event);
	}

	_onEditClick() {
		const event = new CustomEvent('d2l-rule-edit-click', {
			bubbles: true
		});
		this.dispatchEvent(event);
	}

	_setTitle() {
		const conditions = this.rule.entities;
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
		this._title = title;
	}
}

customElements.define('d2l-discover-rule-card', RuleCard);
