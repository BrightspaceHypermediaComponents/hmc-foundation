import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { nothing } from 'lit-html';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

export class DescriptionMixin extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		if (this.skeleton) return html`<p class="d2l-skeletize-paragraph-2 d2l-activity-description-skeleton-extend-skeleton-width">2-line</p>`;
		return html`
			<span>${this._description ? this._description : nothing}</span>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}
