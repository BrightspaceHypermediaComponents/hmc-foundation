import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/card/card-content-meta.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	award: 'https://api.brightspace.com/rels/award',
	organization: 'https://api.brightspace.com/rels/organization',
	icon: 'icon',
	image: 'image'
});

class AchievementCard extends HypermediaStateMixin(SkeletonMixin(LitElement)) {
	static get properties() {
		return {
			_courseTitle: { type: String, id: 'name', observable: observableTypes.property, route: [{
				observable: observableTypes.link,
				rel: rels.organization
			}]},
			_image: { type: String, observable: observableTypes.link, rel: rels.image, route: [
				{ observable: observableTypes.link, rel: rels.award },
				{ observable: observableTypes.subEntity, rel: rels.icon }
			]},
			_name: { type: String, observable: observableTypes.property, route: [{
				observable: observableTypes.link,
				rel: rels.award
			}]}
		};
	}

	static get styles() {
		return [super.styles, heading4Styles, css`
			:host {
				display: inline-block;
				min-width: 10rem;
			}
			d2l-card {
				width: 100%;
			}
			img {
				object-fit: contain;
				width: 5rem;
				height: 5rem;
			}
			[slot="header"] {
				display: flex;
				justify-content: center;
				padding: 2rem 0 0 0;
			}
			[slot="content"] {
				margin-top: -0.3rem;
			}
			.d2l-heading-4 {
				margin: 0;
			}
		`];
	}

	render() {
		const icon = this._image ? html`
			<img src="${this._image}" alt="" />
		` : null;
		return html`
			<d2l-card align-center text="View ${this._name} details" href="${this.href}">
				<div slot="header" class="d2l-skeletize">${icon}</div>
				<d2l-button-icon slot="actions" text="Share" icon="tier1:share" translucent visible-on-ancestor></d2l-button-icon>
				<div slot="content">
					<div class="d2l-heading-4 d2l-skeletize">${this._name}</div>
					<d2l-card-content-meta class="d2l-skeletize">${this._courseTitle}</d2l-card-content-meta>
				</div>
			</d2l-card>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

}
customElements.define('d2l-achievement-card', AchievementCard);
