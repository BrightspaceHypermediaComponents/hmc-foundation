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
	questionText: 'https://questions.api.brightspace.com/rels/questionText',
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
			questionText: {
				type: String,
				observable: observableTypes.property,
				id: 'text',
				route: [route.specialization, {
					observable: observableTypes.subEntity,	rel: rels.questionText
				}]
			},
			name: {
				type: String,
				observable: observableTypes.property,
				id: 'name',
				route: [route.specialization]
			},
			// type: {
			// 	type: Number,
			// 	observable: observableTypes.property,
			// 	id: 'type',
			// 	route: [route.specialization]
			// },
			typeText: {
				type: String,
				observable: observableTypes.property,
				id: 'typeText',
				route: [route.specialization]
			},
			usedIn: {
				type: Array,
				observable: observableTypes.property,
				id: 'usedIn',
				route: [route.specialization]
			},
			points: {
				type: Number
			},
			quizName: {
				type: String,
				attribute: 'quiz-name'
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
				.question-item {
					display: flex;
					flex-wrap: nowrap;
					width: 100%;
				}
				.checkbox > * {
					display: inline;
					flex-shrink: 0;
				}
				.question {
					flex-grow: 1;
				}
				.question-number {
					margin-block-start: 0;
					margin-block-end: 0;
					margin-inline-start: 0.4rem;
					margin-inline-end: 0.3rem;
					flex-basis: 3rem;
					flex-shrink: 0;
					word-break: break-all;
				}
				.points {
					flex-basis: 4rem;
					text-align: end;
					flex-shrink: 0;
				}
				.question-type {
					color: var(--d2l-color-tungsten);
					max-width: 10rem;
					margin: 0;
				}
			`];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.usedIn = [];
	}

	render() {
		return html`
			<div class="question-item d2l-skeletize">
				<div class="d2l-body-standard question-number d2l-skeletize">${this.number}</div>
				<div class="question d2l-skeletize">
					<span class="d2l-body-compact d2l-skeletize">${this.name || this.questionText}</span>
					<div question-type>
						<span class="d2l-body-small d2l-skeletize">${this.typeText}</span>
						${this._getAlsoIn().length > 0 ?
		html`<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
								 <span class="d2l-body-small d2l-skeletize">
								 ${this._getAlsoInString()}
								 </span>` :
		html``}
					</div>
				</div>
				<div class="points d2l-body-compact d2l-skeletize">${this.localize('points', { count: this.points })}</div>
			</div>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_getAlsoIn() {
		const cloned = Array.from(this.usedIn);
		const idx = cloned.findIndex(elem => elem === this.quizName);
		cloned.splice(idx, 1);
		return cloned;
	}

	_getAlsoInString() {
		const alsoIn = this._getAlsoIn();
		let alsoInString = `${this.localize('also-in')} `;
		for (let i = 0; i < alsoIn.length; i++) {
			alsoInString = alsoInString + alsoIn[i];
			if (i < alsoIn.length - 1) {
				alsoInString = `${alsoInString}, `;
			}
		}

		return alsoInString;
	}
};

customHypermediaElement('d2l-activity-list-item-question', componentClass,
	'd2l-activity-list-item-quiz', [['activity-usage', 'question-version-activity']]);
