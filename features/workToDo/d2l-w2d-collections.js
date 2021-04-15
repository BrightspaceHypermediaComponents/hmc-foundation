import './d2l-w2d-list.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';
import { W2dSummonAction } from './w2dSummonActionObserver.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue#notEmbed'
});

const limitTheNumberOfActivitiesWhenCollapsed = 6;

class W2dCollections extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			overdueGroupByDays: { type: Number, attribute: 'overdue-group-by-days' },
			startDate: { type: String, attribute: 'start-date' },
			endDate: { type: String, attribute: 'end-date' },
			_categories: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'groupByDays',
				startDate: 'currentTime',
				rel: rel.userActivity,
				method: (categories) => Object.values(categories),
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					startDate: 'startDate',
					endDate: 'endDate'
				}]
			},
			_overdue: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'overdueGroupByDays',
				startDate: 'currentTime',
				rel: rel.userActivity,
				route: [
					{ observable: observableTypes.link, rel: rel.overdue }
				],
				method: (categories) => Object.values(categories)
			},
			_overdueHref: {
				type: String,
				observable: observableTypes.link,
				rel: rel.overdue
			}
		};
	}

	static get styles() {
		return [bodyStandardStyles, heading2Styles, heading3Styles, css`
			.d2l-w2d-heading-3 {
				margin: 0;
			}
			.d2l-w2d-flex {
				align-items: center;
				border-bottom: 2px solid var(--d2l-color-mica);
				display: flex;
				justify-content: space-between;
				padding: 0 0 0.35rem 0;
			}
			:host(:not([collapsed])) .d2l-w2d-flex {
				border-bottom: 0;
			}
			.d2l-w2d-count {
				background-color: var(--d2l-color-carnelian-minus-1);
				border: 2px solid var(--d2l-color-carnelian-minus-1);
				box-shadow: 0 0 0 1px white;
				box-sizing: content-box;
				color: white;
				display: inline-block;
				font-weight: 400;
				line-height: 100%;
				position: relative;
				text-align: center;
			}
			.d2l-w2d-heading-3-count {
				border-radius: 0.75rem;
				font-size: 0.7rem;
				min-width: 0.7rem;
				padding: 2px;
			}
			.d2l-w2d-heading-2-count {
				border-radius: 1.05rem;
				font-size: 1.05rem;
				min-width: 1.05rem;
				padding: 5px;
			}
			d2l-w2d-list {
				display: block;
				margin-bottom: 1.2rem;
			}
		`];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this._categories = [];
		this._overdue = [];
		this.collapsed = false;
		this.requiredPropertyForState('currentTime');
		this.requiredPropertyForState('groupByDays');
		this.requiredPropertyForState('overdueGroupByDays');
		this.requiredPropertyForState('endDate');
		this.requiredPropertyForState('startDate');
		this.requiredPropertyForState('collapsed');
	}

	render() {
		let overdueCount = 0;
		let limit = this.collapsed ? limitTheNumberOfActivitiesWhenCollapsed : 0;
		const overdue = this._overdue.map(category => {
			let header = 'Overdue';
			if (!this.collapsed) {
				header = this._renderDate(category.startDate, category.endDate, this.collapsed);
			}
			overdueCount += category.count;
			const list = html`
				${this._renderHeader3(header, category.count)}
				<d2l-w2d-list href="${this._overdueHref}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}" limit="${limit}"></d2l-w2d-list>
			`;
			limit = Math.max(limit - category.count, 0);
			return list;
		});
		let upcomingCount = 0;
		const categories = this._categories.map(category => {
			const header = this._renderDate(category.startDate, category.endDate, this.collapsed);
			upcomingCount += category.count;
			const list = html`
				${this._renderHeader3(header, category.count)}
				<d2l-w2d-list href="${category.href}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}" limit="${limit}"></d2l-w2d-list>
			`;
			limit = Math.max(limit - category.count, 0);
			return list;
		});

		return html`
			${this._renderHeader2(this.localize('overdue'), overdueCount)}
			${overdue}
			${this._renderHeader2(this.localize('upcoming'), upcomingCount)}
			${categories}
		`;
	}

	_renderDate(startDate, endDate, collapsed) {
		const dates = [startDate];
		if (endDate.getTime() !== startDate.getTime()) {
			dates.push(endDate);
		}

		return dates
			.map(date => {
				let formatedDate = formatDate(date, { format: 'monthDay' });
				if (!collapsed) {
					formatedDate = this.localize('dateHeader', 'dayOfWeek', formatDate(date, { format: 'longDayOfWeek'}), 'month', formatDate(date, { format: 'longMonth' }), 'dayOfMonth', date.getDate());
				}
				return formatedDate;
			})
			.join(' - ');
	}

	_renderHeader2(heading, count) {
		if (this.collapsed) return;
		return html`
			<div class="d2l-w2d-flex">
				<h2 class="d2l-heading-2">${heading}</h2>
				<div class="d2l-w2d-count d2l-w2d-heading-2-count ">${count}</div>
			</div>
		`;
	}

	_renderHeader3(heading, count) {
		if (!this.collapsed) return html`<div class="d2l-w2d-flex"><h3 class="d2l-w2d-heading-3">${heading}</h3></div>`;
		return html`
			<div class="d2l-w2d-flex">
				<h3 class="d2l-w2d-heading-3 d2l-heading-3">${heading}</h3>
				<div class="d2l-w2d-count d2l-w2d-heading-3-count">${count}</div>
			</div>
		`;
	}

}

customElements.define('d2l-w2d-collections', W2dCollections);
