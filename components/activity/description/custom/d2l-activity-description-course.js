import '../../../common/d2l-hc-description.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityDescriptionCourse extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_organizationHref: { type: String, observable: observableTypes.link, rel: rels.organization }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			<d2l-hc-description href="${ifDefined(this._organizationHref)}" .token="${this.token}"></d2l-hc-description>
		`;
	}

}
customHypermediaElement('d2l-activity-description-course', ActivityDescriptionCourse, 'd2l-activity-description', [['activity-usage', 'course-offering']]);
