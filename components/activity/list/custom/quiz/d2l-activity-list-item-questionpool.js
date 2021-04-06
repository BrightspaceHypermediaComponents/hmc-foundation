import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import '@brightspace-ui/core/components/inputs/input-styles.js';
import '@brightspace-ui/core/components/colors/colors';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeQuizEditor } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

const route = {
	specialization:
		{ observable: observableTypes.link, rel: rels.specialization }
};

const componentClass = class extends SkeletonMixin(HypermediaStateMixin(LocalizeQuizEditor(LitElement))) {
	static get properties() {
		return {
			number: {
				type: Number
			},
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
			}
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyStandardStyles, bodyCompactStyles,
			bodySmallStyles,
			css `
				:host {
					display: block;
					width: 100%;
				}
				.questionpool-item {
					display: flex;
					flex-wrap: nowrap;
					width: 100%;
				}
				.checkbox > * {
					display: inline;
					flex-shrink: 0;
				}
				.questionpool {
					flex-grow: 1;
				}
				.questionpool-number {
					margin-block-start: 0;
					margin-block-end: 0;
					margin-inline-start: 0.4rem;
					margin-inline-end: 0.3rem;
					flex-basis: 1.9rem;
					flex-shrink: 0;
				}
				.points {
					flex-basis: 4rem;
					text-align: end;
					flex-shrink: 0;
				}
				.questionpool-type {
					color: var(--d2l-color-tungsten);
					margin-inline-start: 4.3rem;
					max-width: 10rem;
				}
			`];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.points = 0;
	}

	render() {
		return html`
			<div class="questionpool-item d2l-skeletize">
				<div class="checkbox"><d2l-input-checkbox></d2l-input-checkbox></div>
				<div class="d2l-body-standard questionpool-number">${this.number}</div>
				<div class="questionpool"><span class="d2l-body-compact">${this.name}</span></div>
				<div class="points d2l-body-compact">${this.localize('points', { count: this.points })}</div>
			</div>
			<div class="d2l-body-small questionpool-type d2l-skeletize">${this.typeText}</div>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
};

customHypermediaElement('d2l-activity-list-item-questionpool', componentClass,
	'd2l-activity-list-item-quiz', [['activity-usage', 'questionpool-activity']]);
