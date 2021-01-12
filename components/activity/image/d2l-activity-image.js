import './custom/d2l-activity-image-collection.js';
import './custom/d2l-activity-image-course.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityImage extends SkeletonMixin(LitElement) {
	static get styles() {
		return [ super.styles, css`
			:host, div {
				height: 100%;
				width: 100%;
			}
		`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`<div class="d2l-skeletize"></div>`;
	}

}

customHypermediaElement('d2l-activity-image', ActivityImage);
