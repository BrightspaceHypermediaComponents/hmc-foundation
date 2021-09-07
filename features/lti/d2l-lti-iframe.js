import { css, html, LitElement } from 'lit-element/lit-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';

class LtiIFrame extends LitElement {
	static get properties() {
		return {
			iFrameWidth: {
				type: String,
				attribute: 'width'
			},
			iFrameHeight: {
				type: String,
				attribute: 'height'
			},
			_launchUrl: {
				type: String,
				attribute: 'lti-launch-url'
			},
			_ltiStorage: {
				type: Object
			}
		};
	}

	static get styles() {
		return [heading4Styles, css`
			.content-frame {
				margin: 1rem 0rem 0.6rem 0rem;
			}
			.content-frame-default-width {
				width: 100%;
			}
			iframe{
				border: none
			}
		` ];
	}

	constructor() {
		super();

		this.iFrameWidth = 800; //TODO use this???
		this.iFrameHeight = 600;
		this._ltiStorage = {};
	}

	connectedCallback() {
		super.connectedCallback();

		this.iFrameHeight = 600;
		this._ltiStorage = {};

		if (window.parent.location.href.includes('cookieLaunch')) {
			window.location.href = this._launchUrl;
		}else{
			this._addStorageSignal();
		}

		this._handleMessage = this._handleMessage.bind(this);
		window.addEventListener('message', this._handleMessage);
	}

	disconnectedCallback() {
		window.removeEventListener('message', this._handleMessage);
		super.disconnectedCallback();
	}

	render() {
		const iFrameClasses = { 'content-frame-default-width': !this.iFrameWidth, 'no-border': true };
		return html`<div class="content-frame">
	<iframe id="lti-iframe-id" class="${classMap(iFrameClasses)}" allow="microphone *; camera *; autoplay *"
		width="100%" height="${this.iFrameHeight}px" src="${this._launchUrl}"></iframe>
</div>`;
	}

	_addStorageSignal(){
		let newLaunchUrl = this._launchUrl;
		const arr = newLaunchUrl.split('?');
		const hasQuestionMark = arr.length > 1;

		const signal = 'signalStorage=true';
		if (!hasQuestionMark) {
			this._launchUrl += `?${signal}`;
		}else{
			this._launchUrl += `&${signal}`;
		}
	}

	_handleMessage(event) {
		if (!event.data) {
			return;
		}

		// eslint-disable-next-line no-console
		console.log('window post', event);

		let params;
		try {
			params = JSON.parse(event.data);

			if (params.subject === 'lti.frameResize') {
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

		const target_window = event.source;
		let response = {};

		// eslint-disable-next-line no-console
		console.log('data', JSON.stringify(event.data));

		if (event.data.subject === 'org.imsglobal.lti.capabilities') {
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.capabilities.response',
				supported_messages: [
					{ subject: 'org.imsglobal.lti.capabilities' },
					{ subject: 'org.imsglobal.lti.put_data' },
					{ subject: 'org.imsglobal.lti.get_data' }
				]
			};
			target_window.postMessage(response, '*');
		}

		if (event.data.subject === 'org.imsglobal.lti.put_data') {
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.put_data.response',
				key: event.data.key,
				value: event.data.value
			};

			if (!this._ltiStorage[event.origin]) {
				this._ltiStorage[event.origin] = {};
			}
			this._ltiStorage[event.origin][event.data.key] = event.data.value;
			target_window.postMessage(response, event.origin);

		}

		if (event.data.subject === 'org.imsglobal.lti.get_data') {
			response = {
				message_id: event.data.message_id,
				subject: 'org.imsglobal.lti.get_data.response',
				key: event.data.key,
				value: this._ltiStorage[event.origin][event.data.key]
			};

			target_window.postMessage(response, event.origin);
		}
	}
}

customElements.define('d2l-lti-iframe', LtiIFrame);
