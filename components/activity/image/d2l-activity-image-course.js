import '../../common/d2l-hm-course-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityImageCourse extends HypermediaLitMixin(LitElement) {
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
			<d2l-hm-course-image href="${this._organizationHref}" .token="${this.token}"></d2l-hm-course-image>
		`;
	}

}

customHypermediaElement('d2l-activity-image-course', ActivityImageCourse, 'd2l-activity-image', [['activity-usage', 'course-offering']]);
