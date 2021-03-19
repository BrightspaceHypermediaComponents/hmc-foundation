import '../../../../list/custom/quiz/d2l-activity-list-item-question.js';
import '../../../../list/custom/quiz/d2l-activity-list-item-section.js';

import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});

const componentClass = class extends HypermediaStateMixin(ListItemLinkMixin(LitElement)) {
	static get properties() {
		return {
			number: {
				type: Number
			},
			_points: {
				type: String,
				observable: observableTypes.property,
				id: 'points'
			},
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	static get styles() {
		return [ super.styles, css `` ];
	}

	constructor() {
		super();
		this.actionHref = '#';
	}

	render() {
		return this._renderListItem({
			//${guard([this._activityHref, this.token], () => html`<d2l-activity-list-item-content href="${this._activityHref}" .token="${this.token}"></d2l-activity-list-item-content>`)}`
			content: html`${guard([this._activityHref, this.token], () => html`
			<d2l-activity-list-item-quiz number="${this.number}" href="${this._activityHref}"
				.token="${this.token}" points="${this._points}">

			</d2l-activity-list-item-quiz>`)}`,
			// actions: html`actions here`
		});
	}

	_handleLinkClick(e) {
		e.preventDefault();
		const delayedResult = this._openDialog();

		// "X" abort handler
		delayedResult.AddReleaseListener(() => {});

		// Save or Cancel button Handler
		delayedResult.AddListener((/*result*/) => {
			fetch(this._state, true).then(() => {
				// refresh collection
				fetch(Array.from(this._state._parents.keys())[0], true);
			});
		});
	}

	_openDialog() {
		const open = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.OpenFullscreen;
		const url = new D2L.LP.Web.Http.UrlLocation(
			`/d2l/lms/question/edit/${this.key}`);
		return open(url, 'SrcCallBack', 'result', [], false, '');
	}

	_renderPrimaryAction(contentId) {
		return html `<a aria-labelledby="${contentId}" href="#" @click="${this._handleLinkClick}"></a>`;
	}

};

customElements.define('d2l-activity-collection-item-quiz', componentClass);
