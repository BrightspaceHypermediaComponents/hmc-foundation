import '../../../common/d2l-hc-course-image.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LitElement } from 'lit-element/lit-element.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityImageCourse extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_organizationHref: { type: String, observable: observableTypes.link, rel: rels.organization }
		};
	}

	render() {
		return html`<d2l-hc-course-image href="${this._organizationHref}" .token="${this.token}"></d2l-hc-course-image>`;
	}

}

customHypermediaElement('d2l-activity-image-course', ActivityImageCourse, 'd2l-activity-image', [['activity-usage', 'course-offering']]);
