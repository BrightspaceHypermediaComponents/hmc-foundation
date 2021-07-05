import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import '@brightspace-ui/core/components/inputs/input-styles.js';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-fetch/d2l-fetch.js';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeQuizEditor } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	questionText: 'https://questions.api.brightspace.com/rels/questionText',
	specialization: 'https://api.brightspace.com/rels/specialization',
	parentCollections: 'https://activities.api.brightspace.com/rels/parent-collections',
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});
const route = {
	questionText: { observable: observableTypes.subEntity,	rel: rels.questionText },
	specialization: { observable: observableTypes.link, rel: rels.specialization },
	parentCollections: { observable: observableTypes.link, rel: rels.parentCollections }
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
				route: [route.specialization, route.questionText]
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
			parentCollections: {
				type: Array,
				observable: observableTypes.subEntities,
				rel: rels.item,
				route: [route.parentCollections]
			},
			alsoIn: {
				type: Array
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
		this.parentCollections = [];
		this.alsoIn = [];
	}

	render() {
		return html`
			<div class="question-item d2l-skeletize">
				<div class="d2l-body-standard question-number d2l-skeletize">${this.number}</div>
				<div class="question d2l-skeletize">
					<span class="d2l-body-compact d2l-skeletize">${this.name || this.questionText}</span>
					<div question-type>
						<span class="d2l-body-small d2l-skeletize">${this.typeText}</span>
						${this.parentCollections.length > 1 ?
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

	updated(changedProperties) {
		if (changedProperties.has('parentCollections') &&
			this.parentCollections.length > 0 &&
			this.parentCollections.length > changedProperties.get('parentCollections').length) {
			this._getAlsoIn();
		}
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	_getActivityUsageHref(item) {
		const activityUsageHref = item.links.find(link => link.rel.includes(rels.activityUsage)).href;
		return activityUsageHref;
	}

	_getAlsoIn() {
		for (let i = 0; i < this.parentCollections.length; i++) {
			const activityUsageHref = this._getActivityUsageHref(this.parentCollections[i]);
			window.D2L.Siren.EntityStore.fetch(activityUsageHref, this.token, false).then((activityUsage) => {
				if (activityUsage) {
					const specializationLink = activityUsage.entity.links.find(link => link.rel.includes(rels.specialization)).href;
					window.D2L.Siren.EntityStore.fetch(specializationLink, this.token, false).then((quiz) => {
						if (this.quizName !== quiz.entity.properties.name) {
							this.alsoIn.push(quiz.entity.properties.name);
							this.requestUpdate();
						}
					});
				}
			});
		}
	}

	_getAlsoInString() {
		let alsoInString = `${this.localize('also-in')} `;
		for (let i = 0; i < this.alsoIn.length; i++) {
			alsoInString = alsoInString + this.alsoIn[i];
			if (i < this.alsoIn.length - 1) {
				alsoInString = `${alsoInString}, `;
			}
		}

		return alsoInString;
	}
};

customHypermediaElement('d2l-activity-list-item-question', componentClass,
	'd2l-activity-list-item-quiz', [['activity-usage', 'question-version-activity']]);
