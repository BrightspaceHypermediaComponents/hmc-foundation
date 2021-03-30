import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities'
});

class w2dWorkToDo extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			_categories: {
				type: Object,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'groupByDays',
				startDate: 'currentTime',
				route: [
					{ observable: observableTypes.link, rel: rel.myActivities }
				],
				method: (categories) => Object.values(categories)
			},
			_myActivitiesHref: { type: String, observable: observableTypes.link, rel: rel.myActivities }
		};
	}

	constructor() {
		super();
		this._categories = [];
		this.waitForProperty('currentTime');
		this.waitForProperty('groupByDays');
	}

	render() {
		const categories = this._categories.map(category => {
			const endDateString = category.endDate.getTime() !== category.startDate.getTime() ? html` - ${formatDate(category.endDate, { format: 'monthDay' })}` : null;
			return html`
				<h2>${formatDate(category.startDate, { format: 'monthDay' })}${endDateString}</h2>
				<ul>
					<li>${this._myActivitiesHref}</li>
					<li>${category.index}</li>
					<li>${category.count}</li>
				</ul>
			`;
		});
		return html`${categories}`;
	}

}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
