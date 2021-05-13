import '../../components/common/d2l-hc-description.js';
import '../../components/common/d2l-hc-name.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodyCompactStyles, bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	linkPlacement: 'https://lti.api.brightspace.com/rels/link-placement'
});

class LtiActivity extends SkeletonMixin(LocalizeDynamicMixin(HypermediaStateMixin(LitElement))) {

	static get properties() {
		return {
			iFrameWidth: {
				type: String,
				observable: observableTypes.property,
				route: [ {
					observable: observableTypes.link,
					rel: rels.linkPlacement
				}]
			},
			iFrameHeight: {
				type: String,
				observable: observableTypes.property,
				route: [ {
					observable: observableTypes.link,
					rel: rels.linkPlacement
				}]
			},
			launchUrl: {
				type: String,
				observable: observableTypes.property,
				route: [ {
					observable: observableTypes.link,
					rel: rels.linkPlacement
				}]
			},
			_ltiLinkHref: {
				type: String,
				observable: observableTypes.link,
				rel: rels.linkPlacement
			},
			_showOpenInNewWindowButton: {
				type: Boolean,
				attribute: 'open-as-external'
			}
		};
	}

	static get styles() {
		return [ super.styles, bodySmallStyles, heading3Styles, bodyCompactStyles, css`
		  :host {
			display: inline-block;

		  }
		  .spanning-button {
			width: 100%;
		  }
		  .skeleton-placeholder {
			  width: 10rem;
			  height: 5rem;
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
		this._showOpenInNewWindowButton = false;
		this.skeleton = true;
	}

	render() {
		return html`
			<div>
				<d2l-hc-name ?skeleton=${this.skeleton} class="d2l-heading-3" href="${this._ltiLinkHref}" .token="${this.token}"></d2l-hc-name>
			</div>
			<div class="d2l-body-compact">
				<d2l-hc-description  ?skeleton=${this.skeleton} href="${this._ltiLinkHref}" .token="${this.token}"></d2l-hc-description>
			</div>
			<div class="d2l-body-compact">
				${this.localize('external-activity-check-below')}
			</div>

			${this.skeleton ? html`<div class="d2l-skeletize skeleton-placeholder"></div>` :

		html`${this._showOpenInNewWindowButton ?
			html`<d2l-button class="spanning-button" primary @click="${this._onOpenInNewWindowClick}">${this.localize('open-in-new-window')}</d2l-button>` :
			html`<iframe allow="microphone *; camera *; autoplay *" width="${this.iFrameWidth}" height="${this.iFrameHeight}" src="${this.launchUrl}"></iframe>
						<div>
							<d2l-button-subtle text="${this.localize('open-in-new-window')}" icon="tier1:new-window" @click="${this._onOpenInNewWindowClick}"></d2l-button-subtle>
						</div>`

		}`
}
	  	`;
	}
	openWindow(url, title, width, height) {
		const left = (screen.width / 2) - (width / 2);
		const top = (screen.height / 2) - (height / 2);

		window.open(url, title, `resizable=yes, width=${ width }, height=${ height  }, top=${ top }, left=${ left}`);
	}
	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_onOpenInNewWindowClick() {
		this.openWindow(this.launchUrl, this.localize('external-activity'), this.iFrameWidth, this.iFrameHeight);
	}
}

customElements.define('d2l-lti-activity', LtiActivity);
