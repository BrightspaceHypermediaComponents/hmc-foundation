import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import '@brightspace-ui/core/components/inputs/input-styles.js';
import '@brightspace-ui/core/components/colors/colors';
import '../../../editor/collection/custom/quiz/d2l-activity-collection-item-quiz.js';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles, heading2Styles, heading3Styles  } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeQuizEditor } from './lang/localization.js';
import { repeat } from 'lit-html/directives/repeat';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization',
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

const route = {
	specialization:
		{ observable: observableTypes.link, rel: rels.specialization },
	collection:
		{ observable: observableTypes.link, rel: rels.collection }
};

const componentClass = class extends SkeletonMixin(HypermediaStateMixin(LocalizeQuizEditor(LitElement))) {
	static get properties() {
		return {
			name: {
				type: String,
				observable: observableTypes.property,
				id: 'name',
				route: [route.specialization]
			},
			typeText: {
				type: String,
				observable: observableTypes.property,
				id: 'typeText',
				route: [route.specialization]
			},
			items: {
				type: Array,
				observable: observableTypes.subEntities,
				rel: rels.item,
				route: [route.collection]
			},
			refreshCounter: {
				type: Number,
				attribute: 'refresh-counter'
			},
			_refreshState: {
				type: Object,
				observable: observableTypes.refreshState,
				route: [route.specialization]
			}
		};
	}

	static get styles() {
		return [
			super.styles,
			heading2Styles, heading3Styles,
			bodyStandardStyles, bodyCompactStyles,
			bodySmallStyles,
			css `
				:host {
					display: block;
					width: 100%;
				}
				.section-item {
					display: flex;
					flex-wrap: nowrap;
					width: 100%;
					height: 2rem;
				}
				.checkbox > * {
					display: inline;
					flex-shrink: 0;
				}
				.section {
					flex-grow: 1;
					margin-left: 0.3rem;
				}
				.section-type {
					color: var(--d2l-color-tungsten);
					margin-inline-start: 2rem;
					max-width: 10rem;
				}
				.section-nested-items {
					margin-left: 2rem
				}
			`];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.items = [];
	}
	render() {
		// It is just a temporary solution to add nested list here. Waiting for the decision/discusson on how
		// to do nested lists properly
		return html`
			<div class="section-item d2l-skeletize">
				<div class="checkbox"><d2l-input-checkbox></d2l-input-checkbox></div>
				<div class="section"><span class="d2l-heading-2">${this.name}</span></div>
			</div>
			<div class="d2l-body-small section-type d2l-skeletize">${this.typeText}</div>
			<d2l-list separators="none" class="section-nested-items" @d2l-list-item-position-change="${this._moveItems}">
				${repeat(this.items, item => item.href, (item, idx) => html`
					<d2l-activity-collection-item-quiz number="${idx + 1}" href="${item.href}" .token="${this.token}" key="${item.properties.id}"></d2l-activity-collection-item-quiz>
				`)}
			</d2l-list>
		`;
	}
	updated(changedProperties) {
		if (changedProperties.has('refreshCounter') && this.refreshCounter > 0) {
			this.skeleton = true;
			this._refreshState();
		}
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
};

customHypermediaElement('d2l-activity-list-item-section', componentClass,
	'd2l-activity-list-item-quiz', [['activity-usage', 'section-activity']]);
