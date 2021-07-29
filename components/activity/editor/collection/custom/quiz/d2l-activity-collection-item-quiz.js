import '../../../../list/custom/quiz/d2l-activity-list-item-question.js';
import '../../../../list/custom/quiz/d2l-activity-list-item-section.js';
import '../../../../list/custom/quiz/d2l-activity-list-item-questionpool.js';

import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { fetch } from '@brightspace-hmc/foundation-engine/state/fetch.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ListItemButtonMixin } from '@brightspace-ui/core/components/list/list-item-button-mixin.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage',
	up: 'up',
	quiz: 'https://api.brightspace.com/rels/quiz'
});

const componentClass = class extends HypermediaStateMixin(ListItemButtonMixin(LitElement)) {
	static get properties() {
		return {
			number: {
				type: Number
			},
			quizActivityUsageHref: {
				type: String
			},
			_points: {
				type: String,
				observable: observableTypes.property,
				id: 'points'
			},
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage },
			_refreshCounter: {
				type: Number,
			},
			deleteAction: {
				type: Object,
				observable: observableTypes.action,
				name: 'remove-activity'
			}
		};
	}

	static get styles() {
		return [
			super.styles,
			css `
				input[type="checkbox"].d2l-input-checkbox {
							margin-top: 0.7rem;
				}
			` ];
	}

	constructor() {
		super();
		this.actionHref = '#';
		this._refreshCounter = 0;
		this.selectable = true;
		this.quizActivityUsageHref = '';
	}

	render() {
		return this._renderListItem({
			//${guard([this._activityHref, this.token], () => html`<d2l-activity-list-item-content href="${this._activityHref}" .token="${this.token}"></d2l-activity-list-item-content>`)}`
			content: html`${guard([this._activityHref, this.token, this._points, this._refreshCounter, this.quizActivityUsageHref], () => html`
			<d2l-activity-list-item-quiz number="${this.number}" href="${this._activityHref}"
				.token="${this.token}" points="${this._points}" refresh-counter="${this._refreshCounter}" quizActivityUsageHref="${this.quizActivityUsageHref}">

			</d2l-activity-list-item-quiz>`)}`,
			// actions: html`actions here`
		});
	}

	_onButtonClick(e) {
		e.preventDefault();
		const delayedResult = this._openDialog();

		// "X" abort handler
		delayedResult.AddReleaseListener(() => {});

		// Save or Cancel button Handler
		delayedResult.AddListener((activities) => {
			// Trigger Section child to refresh name
			++this._refreshCounter;
			const activityHrefs = activities.map(activity => activity.href);
			fetch(this._state, true).then(() => {
				// refresh Total Quiz Points
				this.dispatchEvent(new CustomEvent('d2l-question-updated', {
					bubbles: true,
					composed: true,
					detail: { activities: activityHrefs }
				}));
			});
		});
	}

	_openDialog() {
		const open = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.OpenFullscreen;
		const url = new D2L.LP.Web.Http.UrlLocation(
			`/d2l/lms/question/edit/${this.key}`);
		return open(url, 'SrcCallBack', 'result', [], false, '');
	}

};

customElements.define('d2l-activity-collection-item-quiz', componentClass);
