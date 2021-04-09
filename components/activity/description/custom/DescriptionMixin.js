import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { nothing } from 'lit-html';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

export class DescriptionMixin extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	static get styles() {
		const styles = [ css`
			.d2l-activity-description-skeleton-extend-skeleton-width {
				display: inline-block;
				min-width: 5rem;
			}
		`];

		super.styles && styles.push(super.styles);
		return styles;
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		if (this.skeleton) return html`Description<div class="d2l-activity-description-skeleton-extend-skeleton-width"></div>`;
		return html`
			<span class="d2l-skeletize">${this._description ? this._description : nothing}</span>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}
