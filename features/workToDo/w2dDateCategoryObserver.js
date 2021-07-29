import { SirenSubEntities } from '@brightspace-hmc/foundation-engine/state/observable/SirenSubEntities.js';

const msInADay = 86400000;

export class W2dDateCategory extends SirenSubEntities {

	static definedProperty({ token, groupByDays, startDate, category, verbose }) {
		return { token, groupByDays, startDate, category, verbose };
	}

	/**
	 * @return { Array<SirenFacade> }
	 */
	get entities() {
		return this._observers.value || {};
	}

	/**
	 * @param { Array<SirenFacade> } sirenFacades - List of SirenFacade objects
	 */
	set entities(sirenFacades) {
		this._sirenFacades = sirenFacades;
		if (!this._startDate || this._groupByDays === undefined) {
			return;
		}

		const sirenFacadesByCategory = {};
		const categoryInfo = {};
		sirenFacades.forEach(sirenFacade => {
			const daysTillDueDate = numOfDaysTillDueDate(sirenFacade, this._startDate);
			if (daysTillDueDate === false) return;
			const index = this._groupByDays === 0 ? 0 : Math.floor(daysTillDueDate / this._groupByDays);
			if (!categoryInfo[index]) {
				const startDate = new Date(this._startDate.getTime() + index * msInADay * this._groupByDays);
				const endDate = new Date(startDate.getTime() +  msInADay * (this._groupByDays - 1));
				categoryInfo[index] = {
					startDate,
					endDate,
					index,
					count: 0,
					href: this._state.href
				};
			}
			categoryInfo[index].count++;
			sirenFacadesByCategory[index] = sirenFacadesByCategory[index] ? sirenFacadesByCategory[index] : [];
			sirenFacadesByCategory[index].push(sirenFacade);
		});
		this._observers.setProperty({categoryInfo, sirenFacadesByCategory});
	}

	addObserver(observer, property, { method, category, startDate, groupByDays } = {}) {
		if (!category) {
			this._startDate = new Date(observer[startDate]);
			this._groupByDays = observer[groupByDays];
			this.entities = this._sirenFacades || [];
		}

		const filterByCategory = categoryMap => (category ? categoryMap.sirenFacadesByCategory[observer[category]] : categoryMap.categoryInfo);
		super.addObserver(observer, property, { method: method ? (items) => method(filterByCategory(items)) : filterByCategory });
	}
}

function numOfDaysTillDueDate(sirenFacade, relativeTime) {
	let entities = sirenFacade.entities.filter(entity => entity.hasClass('due-date'));
	if (!entities.length) {
		entities = sirenFacade.entities.filter(entity => entity.hasClass('end-date'));
		if (!entities.length) return false;
	}
	const entity = entities.pop();
	const date = new Date(Date.parse(entity.properties.localizedDate));
	return Math.floor((date.getTime() - relativeTime.getTime()) / msInADay);
}
