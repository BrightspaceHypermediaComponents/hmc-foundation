import '../../common/d2l-hm-name.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { customHypermediaElement } from '../../../framework/hypermedia-components.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityNameCourse extends HypermediaLitMixin(LitElement) {
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
			<d2l-hm-name href="${this._organizationHref}" .token="${this.token}"></d2l-hm-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-course', ActivityNameCourse, 'd2l-activity-name', [['activity-usage', 'course-offering']]);
