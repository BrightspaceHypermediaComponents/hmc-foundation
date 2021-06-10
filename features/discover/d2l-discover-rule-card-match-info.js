import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import 'd2l-users/components/d2l-profile-image.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { MatchCountMixin } from './mixins/match-count-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class RuleCardMatchInfo extends MatchCountMixin(LocalizeDynamicMixin(HypermediaStateMixin(RtlMixin(LitElement)))) {

	static get properties() {
		return {
			rule: { type: Object },
			_matchCount: { type: Number },
			_userList: { type: Array },
		};
	}

	static get styles() {
		return css`
			.d2l-rule-card-match {
				display: flex;
			}
			.d2l-rule-card-profiles {
				display: flex;
				flex-direction: row;
			}
			.d2l-rule-card-profile-images-image {
				width: 1rem;
				border-radius: 0.3rem;
				border: 0.1rem solid white;
			}
			.d2l-rule-card-profile-images-more {
				width: 1rem;
				line-height: 1.6rem;
				text-align: center;
			}
			.d2l-rule-card-profile-images-more-background {
				background-color: var(--d2l-color-sylvite);
				border-radius: 0.3rem;
				border: 0.1rem solid white;
				width: 1.53rem;
				height: 1.53rem;
			}
			.d2l-rule-card-profile-images-more-icon {
				color: var(--d2l-color-galena);
			}
			.d2l-rule-card-match-users-count {
				color: var(--d2l-color-tungsten);
				font-size: 0.7rem;
				font-weight: 300;
				height: 1.53rem;
				line-height: 1.6rem;
				padding-left: 1.5rem;
			}
		`;
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this._userList = [];
		this._matchCount = null;
	}

	render() {
		return html`
			<div class="d2l-rule-card-match">
				${this._userList?.length > 0 ? html`
					<div class="d2l-rule-card-profiles">
						${this._userList.map((userHref) => html`
							<d2l-profile-image class="d2l-rule-card-profile-images-image" href="${userHref}" token="${this.token}" small></d2l-profile-image>
						`)}
						${this._matchCount > 3 ? html`
							<div class="d2l-rule-card-profile-images-more">
								<div class="d2l-rule-card-profile-images-more-background">
									<d2l-icon class="d2l-rule-card-profile-images-more-icon" icon="d2l-tier1:more"></d2l-icon>
								</div>
							</div>
						` : null}
					</div>
				` : null }
				<div class="d2l-rule-card-match-users-count">
					${this._matchCount !== null ? html`${this.localize('text-rule-matches-card', 'count', this._matchCount)}` : null}
				</div>
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('rule')) {
			this._updateMatchInfo();
		}
	}

	async _updateMatchInfo() {
		this._matchCount = this.rule.properties.matchCount;
		this._userList =  this.rule.properties.userList;
	}
}

customElements.define('d2l-discover-rule-card-match-info', RuleCardMatchInfo);
