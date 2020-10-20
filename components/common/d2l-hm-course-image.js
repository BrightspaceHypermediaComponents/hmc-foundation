import 'd2l-course-image/d2l-course-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from 'foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from 'foundation-engine/framework/lit/hypermedia-components.js';

const rels = Object.freeze({
	courseImage: 'https://api.brightspace.com/rels/organization-image'
});

class HmCourseImage extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			tileSizes: { type: Object },
			type: { type: String },
			courseImage: { type: Array, observable: observableTypes.entity, route: [{observable: observableTypes.subEntity, rel: rels.courseImage}] }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	constructor() {
		super();
		this.tileSizes = {
			mobile: { maxwidth: 767, size: 100 },
			tablet: { maxwidth: 1243, size: 67 },
			desktop: { size: 25 }
		};
		this.type = 'tile';
	}

	render() {
		return html`
			<d2l-course-image .image="${this.courseImage}" .sizes="${this.tileSizes}" type="${this.type}"></d2l-course-image>
		`;
	}

}
customElements.define('d2l-hm-course-image', HmCourseImage);
