import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeCommon } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class HmName extends SkeletonMixin(HypermediaStateMixin(LocalizeCommon(LitElement))) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [ super.styles, css`
			.d2l-activity-name-skeleton-extend-skeleton-width {
				display: inline-block;
				min-width: 5rem;
			}
			.d2l-skeletize {
				overflow-y: hidden;
				white-space: nowrap;
			}
		`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`<span class="d2l-skeletize">${this.name ? this.name : html`${this.localize('name')} <div class="d2l-activity-name-skeleton-extend-skeleton-width"></div>`}</span>`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (!changedProperties.has('name')) return;
		this.dispatchEvent(new CustomEvent('d2l-label-change', {
			bubbles: true,
			composed: true,
			detail: this.name
		}));
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

}
customElements.define('d2l-hc-name', HmName);
