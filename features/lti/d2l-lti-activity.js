import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import {classMap} from 'lit-html/directives/class-map.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
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
			},
			_ltiLaunchUrl:{
				type: String,
				attribute: 'lti-launch-url'
			},
			_ltiValidationUrl:{
				type: String,
				attribute: 'lti-validation-url'
			}
		};
	}

	static get styles() {
		return [ super.styles, heading4Styles, css`
			:host {
				width: 100%;
				height: 100%;
			}

			@media (prefers-reduced-motion: reduce) {
				:host {
					transition: none;
				}
			}

			.d2l-heading-4 {
				flex-grow: 1;
				margin:0;
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
				height: 100%;
			}
			.content-frame-default-width {
				width: 100%;
			}
			.no-border{
				border: none;
			}
			.spanning-button {
				width: 100%;
				margin: 1rem 0rem 1.2rem 0rem;
			}
			.subtle-button {
				margin: 0.6rem 0rem;
			}
			.skeleton-placeholder {
				width: 10rem;
				height: 5rem;
				margin-bottom: 0.8rem;
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
		this.skeleton = false;

		this.iFrameWidth = 800;
		this.iFrameHeight = 600;
	}

	connectedCallback() {
		super.connectedCallback();

		if(window.parent.location.href.includes('cookieLaunch')){
			window.location.href = this._ltiLaunchUrl;
		}

		this._handleMessage = this._handleMessage.bind(this);
		window.addEventListener('message', this._handleMessage);
	}

	disconnectedCallback() {
		window.removeEventListener('message', this._handleMessage);
		super.disconnectedCallback();
	}

	render() {
		const iFrameClasses = { 'content-frame-default-width': !this.iFrameWidth, 'no-border':true };
		return html`<div class="content-frame">
		<iframe id="lti-iframe-id" class="${classMap(iFrameClasses)}" allow="microphone *; camera *; autoplay *" width="100%" height="${this.iFrameHeight}px" src="${this._ltiLaunchUrl}"></iframe>
	</div>`
	};


	_handleMessage(event) {
		if (!event.data) {
			return;
		}

		console.log('window post', event);

		let params;
		try {
			params = JSON.parse(event.data);

			if(params.subject === 'lti.frameResize'){
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
			return;
		}
		catch (exception) {
			//don't error. new messages are objects and aren't meant to be parsed
		}

		if (!event.data.subject || (event.data.subject !== 'org.imsglobal.lti.capabilities' && event.data.subject !== 'org.imsglobal.lti.put_data' && event.data.subject !== 'org.imsglobal.lti.get_data')) {
			return;
		}

		let target_window = event.source;
		let response={};
		
		if(event.data.subject === 'org.imsglobal.lti.capabilities'){
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.capabilities.response',
				supported_messages:[
					{ subject: 'org.imsglobal.lti.capabilities' },
					{ subject: 'org.imsglobal.lti.put_data' },
					{ subject: 'org.imsglobal.lti.get_data' }
				]
			}
			target_window.postMessage(response,'*');
		}

		if (event.data.subject === 'org.imsglobal.lti.put_data') {
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.put_data.response'
			}

			window.fetch(this._ltiValidationUrl,{ method: "POST", body: JSON.stringify({origin:event.origin})}).then((r) => {			
				if(r.ok){
					window.sessionStorage.setItem(`lti_${event.origin}_${event.data.key}`, event.data.value);

					response.key = event.data.key;
					response.value = event.data.value;
				}else{
					response.error = { code: "bad_request", message: "The origin is invalid" }
				}

				target_window.postMessage(response,event.origin);
			});			
		}

		if (event.data.subject === 'org.imsglobal.lti.get_data') {
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.get_data.response',
				key: event.data.key
			}

			window.fetch(this._ltiValidationUrl,{ method: "POST", body: JSON.stringify({origin:event.origin})}).then((r) => {			
				if(r.ok){
					response.value = window.sessionStorage.getItem(`lti_${event.origin}_${event.data.key}`);
				}else{
					response.error = { code: "bad_request", message: "The origin is invalid" }
				}

				target_window.postMessage(response,event.origin);
			});		
		}
	}

	_onOpenInNewWindowClick() {
		this.openWindow(this._launchUrl, this.localize('external-activity'), this.iFrameWidth, this.iFrameHeight);
	}
}

customElements.define('d2l-lti-activity', LtiActivity);
