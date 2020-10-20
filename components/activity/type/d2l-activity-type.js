import { HypermediaStateMixin, observableTypes } from 'foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from 'foundation-engine/framework/lit/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityType extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			classes: { type: Array, observable: observableTypes.classes }
		};
	}

	static get components() {
		return {
			'learning-path': html`Learning Path`,
			'course-offering': html`Course`,
			default: html`Activity`
		};
	}

	constructor() {
		super();
		this.classes = [];
	}

	render() {
		let type = ActivityType.components.default;
		this.classes && this.classes.some(hmClass => {
			if (!ActivityType.components[hmClass]) return;
			type = ActivityType.components[hmClass];
			return true;
		});
		return html`
			${type}
		`;
	}
}
customElements.define('d2l-activity-type', ActivityType);
