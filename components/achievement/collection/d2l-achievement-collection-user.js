import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/card/card-content-meta.js';
import '../card/d2l-achievement-card.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { repeat } from 'lit-html/directives/repeat';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	award: 'award'
});

class AchievementCollectionUser extends HypermediaStateMixin(SkeletonMixin(LitElement)) {
	static get properties() {
		return {
			_awards: { type: Array, observable: observableTypes.subEntities, rel: rels.award, prime: true }
		};
	}

	static get styles() {
		return [super.styles, css`
			:host {
				display: block;
			}
			.d2l-collection {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				grid-column-gap: 0.8rem;
			}
			.d2l-award.d2l-skeletize {
				min-height: 10rem;
			}
		`];
	}

	constructor() {
		super();
		this._awards = [];
	}

	render() {
		console.log(this._awards);
		return html`
			<div class="d2l-collection">
				${this._renderCards()}
			</div>
		`;
	}

	_renderCards() {
		if (this.skeleton) {
			return html`
				<d2l-achievement-card href="undefined" token="${this.token}"></d2l-achievement-card>
				<d2l-achievement-card href="undefined" token="${this.token}"></d2l-achievement-card>
				<d2l-achievement-card href="undefined" token="${this.token}"></d2l-achievement-card>
			`;
		}
		return html`${repeat(this._awards, award => award.href, award => html`
			<d2l-achievement-card href="${award.href}" token="${this.token}"></d2l-achievement-card>
		`)}`;
	}

}
customHypermediaElement('d2l-achievement-collection-user', AchievementCollectionUser, 'd2l-achievement-collection', [['earned', 'achievement-collection']]);
