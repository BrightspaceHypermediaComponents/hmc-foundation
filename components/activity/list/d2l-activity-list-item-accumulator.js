import '../image/d2l-activity-image.js';
import '../name/d2l-activity-name.js';
import '../type/d2l-activity-type.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ListItemAccumulatorMixin } from '@brightspace-ui-labs/list-item-accumulator/list-item-accumulator-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';
import { LocalizeActivityList } from './lang/localization.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});
const keyCodes = Object.freeze({
	ENTER: 13,
	SPACE: 32
});

class ActivityListItemAccumulator extends LocalizeActivityList(HypermediaStateMixin(ListItemAccumulatorMixin(LitElement))) {
	static get properties() {
		return {
			_activityHref: { observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	render() {
		return this._renderListItem({
			illustration: html`${guard([this._activityHref, this.token], () => html`<d2l-activity-image href="${this._activityHref}" .token="${this.token}"></d2l-activity-image>`)}`,
			title: html`${guard([this._activityHref, this.token], () => html`<d2l-activity-name href="${this._activityHref}" .token="${this.token}"></d2l-activity-name>`)}`,
			secondary: html`${guard([this._activityHref, this.token], () => html`<d2l-activity-type href="${this._activityHref}" .token="${this.token}" slot="supporting-info"></d2l-activity-type>`)}`,
			secondaryAction: html`${guard([this._activityHref, this.token], () => html`<d2l-menu-item text="${this.localize('action-remove')}" @click="${this._onRemoveClick}" @keydown="${this._onRemoveKeydown}"></d2l-menu-item>`)}`
		});
	}

	_onRemoveClick() {
		const event = new CustomEvent('d2l-remove-collection-activity-item', {
			detail: { key: this.key },
			bubbles: true
		});
		this.dispatchEvent(event);
	}

	_onRemoveKeydown(e) {
		if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE) {
			this._onRemoveClick();
		}
	}
}
customElements.define('d2l-activity-list-item-accumulator', ActivityListItemAccumulator);
