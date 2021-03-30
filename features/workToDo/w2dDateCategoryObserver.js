import { SirenSubEntities } from '@brightspace-hmc/foundation-engine/state/observable/SirenSubEntities.js';

const msInADay = 86400000;

export class W2dDateCategory extends SirenSubEntities {

	static definedProperty({ token, groupByDays, startDate, category, verbose }) {
		return { token, groupByDays, startDate, category, verbose };
	}

	constructor({ id, token, state, verbose }) {
		super({id, token, state, verbose});
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
		if (!this._startDate || !this._groupByDays) {
			this._sirenFacades = sirenFacades;
			return;
		}
		const sirenFacadesByCategory = {};
		const categoryInfo = {};
		sirenFacades.forEach(sirenFacade => {
			const date = dueDate(sirenFacade, this._startDate);
			const index = Math.floor(date.daysPassed / this._groupByDays);
			if (!categoryInfo[index]) {
				const epochStartTime = this._startDate.getTime();
				const startDate = new Date(epochStartTime + index * msInADay * this._groupByDays);
				const endDate = new Date(startDate.getTime() +  msInADay * (this._groupByDays - 1));
				categoryInfo[index] = {
					startDate,
					endDate,
					index
				};
			}
			sirenFacadesByCategory[index] = sirenFacadesByCategory[index] ? sirenFacadesByCategory[index] : [];
			sirenFacadesByCategory[index].push(date);
		});
		Object.keys(categoryInfo).forEach(index => {
			categoryInfo[index].count = sirenFacadesByCategory[index].length;
		});
		if (this.entities !== sirenFacades) {
			this._observers.setProperty({categoryInfo, sirenFacadesByCategory} || []);
		}
	}

	// Note to self:
	// Make it so we can wait on attributes to be set by the UI before running the HREF

	addObserver(observer, property, { method, category, startDate, groupByDays } = {}) {
		if (!category) {
			this._startDate = new Date(observer[startDate]);
			this._groupByDays = observer[groupByDays];
			if (this._sirenFacades) this.entities = this._sirenFacades;
		}

		const filterByCategory = (categoryMap) => {
			if (!category) {
				return categoryMap.categoryInfo;
			}

			return categoryMap.sirenFacadesByCategory;
		};

		const newMethod = method ? (items) => method(filterByCategory(items)) : filterByCategory;
		super.addObserver(observer, property, { method: newMethod });
	}
}

function dueDate(sirenFacade, relativeTime) {
	const entities = sirenFacade.entities.filter(entity => entity.hasClass('due-date'));
	if (!entities.length) return false;

	const entity = entities.pop();

	const date = new Date(Date.parse(entity.properties.localizedDate));

	return {
		dateObject: date,
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDay(),
		date: date.getDate(),
		time: date.getTime(),
		daysPassed: (Math.floor(date.getTime() / msInADay) - Math.floor(relativeTime.getTime() / msInADay))
	};
}
