import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import '@brightspace-ui/core/components/inputs/input-styles.js';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon.js';

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
			},
			numChoices: {
				type: Number,
				observable: observableTypes.property,
				id: 'numChoices',
				route: [route.specialization]
			},
			numQuestions: {
				type: Number,
				observable: observableTypes.property,
				id: 'numQuestions',
				route: [route.specialization]
			},
			questionPoints: {
				type: Number,
				observable: observableTypes.property,
				id: 'questionPoints',
				route: [route.specialization]
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
					flex-basis: 3rem;
					flex-shrink: 0;
					word-break: break-all;
				}
				.questionpool-emoji {
					margin-inline-start: 0.4rem;
					margin-inline-end: 0.3rem;
					flex-basis: 3rem;
					flex-shrink: 0;
					margin: 0.25rem 1.5rem 0 -0.75rem;    				
				}
				.points {
					flex-basis: 4rem;
					text-align: end;
					flex-shrink: 0;
				}
				.questionpool-type {
					color: var(--d2l-color-tungsten);
					max-width: 10rem;
					margin: 0;
				}
			`];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.numChoices = 0;
		this.numQuestions = 0;
		this.questionPoints = 0;
	}

	render() {
		const range = `${this.number} - ${this.number + this.numQuestions}`;
		return html`
			<div class="questionpool-item d2l-skeletize">
				<div class="checkbox"><d2l-input-checkbox></d2l-input-checkbox></div>
				${this.numQuestions > 0 ?
		html`<div class="d2l-body-standard questionpool-number d2l-skeletize">${range}</div>` :
		html`<d2l-icon icon="emoji:sad" class="questionpool-emoji"></d2l-icon>`}
				<div class="questionpool d2l-skeletize">
					<span class="d2l-body-compact d2l-skeletize">${this.name}</span>
					<div questionpool-type>
						<span class="d2l-body-small d2l-skeletize">${this.typeText}</span>
						<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
						<span class="d2l-body-small d2l-skeletize">
							${this.localize('question_selection', {numQuestions: this.numQuestions, numChoices: this.numChoices, questionPoints: this.questionPoints})}
						</span>
					</div>
				</div>
				<div class="points d2l-body-compact d2l-skeletize">${this.localize('points', { count: this.questionPoints * this.numQuestions })}</div>
			</div>
		`;
	}

	updated(changedProperties) {		
		if (changedProperties.has('refreshCounter') && this.refreshCounter > 0) {
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

customHypermediaElement('d2l-activity-list-item-questionpool', componentClass,
	'd2l-activity-list-item-quiz', [['activity-usage', 'questionpool-activity']]);
