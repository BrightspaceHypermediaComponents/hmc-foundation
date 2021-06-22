import '../../components/common/d2l-hc-description.js';
import '../../components/common/d2l-hc-name.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodyCompactStyles, bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LabelMixin } from '@brightspace-ui/core/mixins/labelled-mixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import {RtlMixin} from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	linkPlacement: 'https://lti.api.brightspace.com/rels/link-placement'
});

class LtiActivity extends SkeletonMixin(LocalizeDynamicMixin(LabelMixin(HypermediaStateMixin(RtlMixin(LitElement))))) {

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
			},
			_grading: {
				type: Boolean,
				attribute: 'grading'
			},
			_preview: {
				type: Boolean,
				attribute: 'preview'
			},
			_assignedActivityHref: {
				type: String,
				attribute: 'assigned-activity-href'
			}
		};
	}

	static get styles() {
		return [ super.styles, bodySmallStyles, heading3Styles, bodyCompactStyles, css`
			:host {
				background-color: #ffffff;
				border: 1px solid var(--d2l-color-gypsum);
				border-radius: 6px;
				box-sizing: border-box;
				display: inline-block;
				position: relative;
				transition: transform 300ms ease-out 50ms, box-shadow 0.2s;
				z-index: 0;
				padding: 1.2rem 0.8rem 0 0.8rem;
				width: 100%;
			}
			:host(:hover) {
				box-shadow: 0 2px 14px 1px rgba(0, 0, 0, 0.06);
			}
			@media (prefers-reduced-motion: reduce) {
				:host {
					transition: none;
				}
			}

			.header {
				display: flex;
			}
			.header-text {
				flex-grow: 1;
			}
			.header-name {
				margin-bottom: 1.5rem;
			}
			:host([dir="rtl"]) d2l-icon {
				margin-right: 0.8rem;
				margin-left: 0;
			}
			d2l-icon {
			  margin-left: 0.8rem;
			  flex-shrink: 0;
			}
			.content-frame {
				margin: 1rem 0rem 0.6rem 0rem;
			}
			.content-frame-default-width {
				width: 100%;
			}
			.spanning-button {
				width: 100%;
				margin: 1rem 0rem;
			}
			.subtle-button {
				margin: 0.6rem 0rem;
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
		this._preview = false;
		this._grading = false;
		this._assignedActivityHref = null;
		this.skeleton = true;
	}

	connectedCallback() {
		super.connectedCallback();
		this._handleMessage = this._handleMessage.bind(this);
		window.addEventListener('message', this._handleMessage);
	}

	disconnectedCallback() {
		window.removeEventListener('message', this._handleMessage);
		super.disconnectedCallback();
	}

	render() {
		return html`
			<div class="header">
				<div class="header-text">
					<div class="header-name">
						<d2l-hc-name class="d2l-heading-3" ?skeleton=${this.skeleton} href="${this._ltiLinkHref}" .token="${this.token}"></d2l-hc-name>
					</div>
					<div class="d2l-body-compact">
						<d2l-hc-description class="d2l-body-compact" ?skeleton=${this.skeleton} href="${this._ltiLinkHref}" .token="${this.token}"></d2l-hc-description>
					</div>
					<div class="d2l-body-compact">
						${this.localize('external-activity-check-below')}
					</div>
				</div>
				<d2l-icon icon="tier2:external"></d2l-icon>
			</div>
			${this.skeleton ? html`<div class="d2l-skeletize skeleton-placeholder"></div>` :

		html`${this._showOpenInNewWindowButton ?
			html`<d2l-button class="spanning-button" primary @click="${this._onOpenInNewWindowClick}">${this.localize('open-in-new-window')}</d2l-button>` :
			html`
				<div class="content-frame">
					<iframe class="${this.iFrameWidth ? '' : 'content-frame-default-width'}" allow="microphone *; camera *; autoplay *" width="${this.iFrameWidth}px" height="${this.iFrameHeight}px" src="${this._launchUrl}"></iframe>
				</div>
				<div class="subtle-button">
					<d2l-button-subtle text="${this.localize('open-in-new-window')}" icon="tier1:new-window" @click="${this._onOpenInNewWindowClick}"></d2l-button-subtle>
				</div>`

		}`
}`;
	}

	set launchUrl(value) {
		let newLaunchUrl = value;
		const oldValue = this.launchUrl;
		if (this._grading || this._preview || this._assignedActivityHref) {
			// need to add at least one parameter to the launch url
			const arr = newLaunchUrl.split('?');
			const hasQuestionMark = arr.length > 1;
			if (!hasQuestionMark) {
				newLaunchUrl += '?';
			}
			let hasParams = hasQuestionMark && arr[1] !== '';

			if (this._grading) {
				if (hasParams) {
					newLaunchUrl += '&grading=true';
				} else {
					newLaunchUrl += 'grading=true';
					hasParams = true;
				}
			}
			if (this._preview) {
				if (hasParams) {
					newLaunchUrl += '&preview=true';
				} else {
					newLaunchUrl += 'preview=true';
					hasParams = true;
				}
			}
			if (this._assignedActivityHref) {
				if (hasParams) {
					newLaunchUrl += `&assignedActivityHref=${encodeURIComponent(this._assignedActivityHref)}`;
				} else {
					newLaunchUrl += `assignedActivityHref=${encodeURIComponent(this._assignedActivityHref)}`;
					hasParams = true;
				}
			}
		}
		this._launchUrl = newLaunchUrl;
		this.requestUpdate('launchUrl', oldValue);
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

	_handleMessage(event) {
		if (!event.data) {
			return;
		}
		let params;
		try {
			params = JSON.parse(event.data);
		}
		catch (exception) {
			return;
		}
		if (!params.subject || params.subject !== 'lti.frameResize') {
			return;
		}
		const MAX_FRAME_HEIGHT = 10000;
		if (!params.height || params.height < 1 || params.height > MAX_FRAME_HEIGHT) {
			console.warn('Invalid height value received, aborting');
			return;
		}

		const el = this.shadowRoot.querySelectorAll('iframe');
		for (let i = 0; i < el.length; i++) {
			if (el[i].contentWindow === event.source) {
				this.iFrameHeight = params.height;
				// eslint-disable-next-line no-console
				console.info(`Setting iFrame height to ${params.height}`);
			}
		}
	}

	_onOpenInNewWindowClick() {
		this.openWindow(this._launchUrl, this.localize('external-activity'), this.iFrameWidth, this.iFrameHeight);
	}
}

customElements.define('d2l-lti-activity', LtiActivity);
