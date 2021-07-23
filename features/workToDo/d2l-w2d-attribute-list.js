import { css, html, LitElement } from 'lit-element/lit-element.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class W2DAttributeList extends SkeletonMixin(LitElement) {
	static get styles() {
		return [ super.styles, css`
			*,
			::slotted(*) {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		`];
	}

	render() {
		return this.skeleton
			? html`
				<div class="d2l-w2d-block">
					<div class="d2l-skeletize">Due date - Subject</div>
				</div>`
			: html`<slot></slot>`;
	}

}
customElements.define('d2l-w2d-attribute-list', W2DAttributeList);
