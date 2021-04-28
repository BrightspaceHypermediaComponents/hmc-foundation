import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes} from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class HmDescription extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			description: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [ super.styles, css`
			.skeleton-placeholder {
				width: 5rem;
				height: 1rem;
			}
		`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`${this.description ? html`<span class="d2l-skeletize">${this.description}</span>` : 
				html`${this.skeleton ? html`<div class="d2l-skeletize skeleton-placeholder"></div>` : html``}`}`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

}
customElements.define('d2l-hc-description', HmDescription);
