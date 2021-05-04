import './d2l-w2d-list.js';
import './d2l-w2d-no-activities.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { skeletonStyles } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';
import { W2dSummonAction } from './w2dSummonActionObserver.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue'
});

const limitTheNumberOfActivitiesWhenCollapsed = 6;

class W2dCollections extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			firstName: { type: String, attribute: 'first-name' },
			overdueGroupByDays: { type: Number, attribute: 'overdue-group-by-days' },
			startDate: { type: String, attribute: 'start-date' },
			endDate: { type: String, attribute: 'end-date' },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			skeleton: { type: Boolean },
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
					endDate: 'endDate',
					collapsed: 'collapsed'
				}]
			},
			_overdue: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'overdueGroupByDays',
				startDate: 'currentTime',
				rel: rel.userActivity,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-overdue-activities',
					startDate: 'startDate',
					endDate: 'endDate',
					collapsed: 'collapsed'
				}],
				method: (categories) => Object.values(categories)
			}
		};
	}

	static get styles() {
		return [bodyStandardStyles, heading2Styles, heading3Styles, skeletonStyles, css`
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
			.d2l-skeletize {
				max-width: 40%;
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
		if (this.skeleton) {
			return html`
				${!this.collapsed ? html`<h2 class="d2l-skeletize d2l-heading-2">${this.localize('overdue')}</h2>` : null}
				<h3 class="d2l-skeletize d2l-w2d-heading-3 d2l-heading-3">May 14 - May 23</h3>
				<d2l-w2d-list skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list>
			`;
		}
		if (this._overdue.length === 0 && this._categories.length === 0) {
			return html`
				<d2l-w2d-no-activities
					?activities="${this.collapsed}"
					?collapsed="${this.collapsed}"
					?complete="${!this.collapsed}"
					data-full-page-path=${this.dataFullPagePath}
					first-name=${this.firstName}></d2l-w2d-no-activities>
			`;
		}
		let overdueCount = 0;
		let limit = this.collapsed ? limitTheNumberOfActivitiesWhenCollapsed : 0;
		const overdue = this._overdue.map(category => {
			let header = this.localize('overdue');
			if (!this.collapsed) {
				header = this._renderDate(category.startDate, category.endDate, this.collapsed);
			}
			overdueCount += category.count;
			const list = html`
				${this._renderHeader3(header, category.count)}
				<d2l-w2d-list href="${category.href}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}" limit="${limit}"></d2l-w2d-list>
			`;
			limit = Math.max(limit - category.count, 0);
			return list;
		});
		let upcomingCount = 0;
		const categories = this._categories.map(category => {
			if (category.index < 0) return;
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
			${this.dataFullPagePath && this._loaded && this.collapsed ? html`<d2l-link href="${this.dataFullPagePath}">${this.localize('fullViewLink')}</d2l-link>` : null}
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
				<div class="d2l-w2d-count d2l-w2d-heading-2-count">${count}</div>
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
