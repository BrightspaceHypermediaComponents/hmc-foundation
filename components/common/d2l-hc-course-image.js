import 'd2l-course-image/d2l-course-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	courseImage: 'https://api.brightspace.com/rels/organization-image'
});

class HmCourseImage extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			tileSizes: { type: Object },
			type: { type: String },
			courseImage: { type: Array, observable: observableTypes.entity, route: [{observable: observableTypes.subEntity, rel: rels.courseImage}] }
		};
	}

	static get styles() {
		return [ super.styles, css`
			:host {
				display: grid;
				grid-template-columns: 100%;
				grid-template-rows: 100%;
				grid-template-areas: "image";
				height: 100%;
				width: 100%;
			}
			div {
				grid-area: image;
				height: 100%;
				width: 100%;
			}
			d2l-course-image {
				grid-area: image;
			}
		`];
	}

	constructor() {
		super();
		this.tileSizes = {
			mobile: { maxwidth: 767, size: 100 },
			tablet: { maxwidth: 1243, size: 67 },
			desktop: { size: 25 }
		};
		this.type = 'tile';
		this.skeleton = true;
	}

	render() {
		return html`
			<div class="d2l-skeletize" ?hidden="${this._loaded}"></div>
			<d2l-course-image .image="${this.courseImage}" .sizes="${this.tileSizes}" type="${this.type}"></d2l-course-image>
		`;
	}

}
customElements.define('d2l-hc-course-image', HmCourseImage);
