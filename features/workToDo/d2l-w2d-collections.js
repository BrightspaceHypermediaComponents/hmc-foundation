import './d2l-w2d-list.js';
import './d2l-w2d-no-activities.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui-labs/pagination/pagination.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { skeletonStyles } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { W2dDateCategory } from './w2dDateCategoryObserver.js';
import { W2dSummonAction } from './w2dSummonActionObserver.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue'
});

const pageSize = Object.freeze({
	collapsed: 6,
	fullScreen: 20
});

class W2dCollections extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean },
			groupByDays: { type: Number, attribute: 'group-by-days' },
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
					pageSize: '_pageSize',
					page: '_pageUpcoming'
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
					pageSize: '_pageSize',
					page: '_pageOverdue'
				}],
				method: (categories) => Object.keys(categories).sort().map(key => categories[key])
			},
			_totalActivities: {
				type: Number,
				name: 'totalActivities',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					startDate: 'startDate',
					endDate: 'endDate',
					pageSize: '_pageSize',
					page: '_pageUpcoming'
				}]
			},
			_pageSize: { type: Number },
			_pageUpcoming: { type: Number },
			_pageOverdue: { type: Number },
			_page: { type: Number },
			_currentPageUpcomming: {
				type: Number,
				name: 'currentPage',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					startDate: 'startDate',
					endDate: 'endDate',
					pageSize: '_pageSize',
					page: '_pageUpcoming'
				}]
			},
			_pagingTotalResultsUpcomming: {
				type: Number,
				name: 'pagingTotalResults',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					startDate: 'startDate',
					endDate: 'endDate',
					pageSize: '_pageSize',
					page: '_pageUpcoming'
				}]
			},
			_currentPageOverdue: {
				type: Number,
				name: 'currentPage',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-overdue-activities',
					startDate: 'startDate',
					endDate: 'endDate',
					pageSize: '_pageSize',
					page: '_pageOverdue'
				}]
			},
			_pagingTotalResultsOverdue: {
				type: Number,
				name: 'pagingTotalResults',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-overdue-activities',
					startDate: 'startDate',
					endDate: 'endDate',
					pageSize: '_pageSize',
					page: '_pageOverdue'
				}]
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
		this._totalActivities = 0;
		this.__currentPageOverdue = 1;
		this._page = 1;
		this.requiredPropertyForState('currentTime');
		this.requiredPropertyForState('groupByDays');
		this.requiredPropertyForState('overdueGroupByDays');
		this.requiredPropertyForState('endDate');
		this.requiredPropertyForState('startDate');
		this.requiredPropertyForState('collapsed');
		this.requiredPropertyForState('_page');
		this.requiredPropertyForState('_pageSize');
	}

	get collapsed() {
		return this._collapsed;
	}

	set collapsed(collapsed) {
		this._pageSize = pageSize[collapsed ? 'collapsed' : 'fullScreen'];
		const oldCollapsed = this.collapsed;
		this._collapsed = collapsed;
		this.requestUpdate('collapsed', oldCollapsed);
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
					?activities="${this._totalActivities !== 0}"
					?collapsed="${this.collapsed}"
					?complete="${!this.collapsed}"
					data-full-page-path=${this.dataFullPagePath}></d2l-w2d-no-activities>
			`;
		}

		let limit = this._pageSize;
		let overdue = null;
		if (this._page <= this._currentPageOverdue) {
			overdue = this._overdue.map(category => {
				let header = this.localize('overdue');
				if (!this.collapsed) {
					header = this._renderDate(category.startDate, category.endDate, this.collapsed);
				}
				if (limit === 0) return;
				const list = html`
					${this._renderHeader3(header, category.count)}
					<d2l-w2d-list href="${category.href}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}" limit="${ifDefined(limit)}"></d2l-w2d-list>
				`;
				limit = limit === undefined ? limit : Math.max(limit - category.count, 0);
				return list;
			});
		}

		if (!this.collapsed && this._isOverdueOnLastPage()) {
			limit = this._lastOverduePageHasMoreThanHalf() ? 0 : this._pageSize;
		}

		let categories = null;
		if (limit > 0) {
			categories = this._categories.map(category => {
				if (category.index < 0) return;
				const header = this._renderDate(category.startDate, category.endDate, this.collapsed);
				if (limit === 0) return;
				const list = html`
					${this._renderHeader3(header, category.count)}
					<d2l-w2d-list href="${category.href}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}" limit="${ifDefined(limit)}"></d2l-w2d-list>
				`;
				limit = limit === undefined ? limit : Math.max(limit - category.count, 0);
				return list;
			});
		}

		return html`
			${overdue ? this._renderHeader2(this.localize('overdue'), this._pagingTotalResultsOverdue) : null}
			${overdue}
			${categories ? this._renderHeader2(this.localize('upcoming'), this._pagingTotalResultsUpcomming) : null}
			${categories}
			${this.dataFullPagePath && this._loaded && this.collapsed ? html`<d2l-link href="${this.dataFullPagePath}">${this.localize('fullViewLink')}</d2l-link>` : null}
			${this._renderPagination()}
		`;
	}

	get _currentPageOverdue() {
		return this.__currentPageOverdue;
	}

	set _currentPageOverdue(page) {
		if (typeof page !== 'number') return;
		const oldValue = this.__currentPageOverdue;
		this.__currentPageOverdue = page;
		this._pageUpcoming = Math.max(1, this._page - page + 1);
		this.requestUpdate('_currentPageOverdue', oldValue);
	}

	get _page() {
		return this.__page;
	}

	set _page(page) {
		const oldValue = this._page;
		this.__page = page;
		this._pageOverdue = page;
		this.requestUpdate('_page', oldValue);
	}

	get _pageOverdue() {
		return (this._pageSize && typeof this._page === 'number' && this._pagingTotalResultsOverdue) ? Math.min(this._page, Math.ceil(this._pagingTotalResultsOverdue / this._pageSize)) : 1;
	}

	set _pageOverdue(page) {
		this._pageUpcoming = page;
		this.requestUpdate('_pageOverdue', 0);
	}

	get _pageSize() {
		return this.__pageSize;
	}

	set _pageSize(pageSize) {
		const oldValue = this._pageSize;
		this.__pageSize = pageSize;
		this._pageOverdue = this._page;
		this.requestUpdate('_pageSize', oldValue);
	}

	get _pageUpcoming() {
		let page = typeof this._page === 'number' ? Math.max(1, this._page - this._pageOverdue) : 1;
		if (!this.collapsed && !this._lastOverduePageHasMoreThanHalf() && !this._isOverdueOnLastPage() && this._page !== 1) {
			page++;
		}
		return page;
	}

	set _pageUpcoming(_) {
		this.requestUpdate('_pageUpcoming', 0);
	}

	get _pagingTotalResultsOverdue() {
		return this.__pagingTotalResultsOverdue;
	}

	set _pagingTotalResultsOverdue(totalCount) {
		const oldValue = this._page;
		this._pageOverdue = this._page;
		this.__pagingTotalResultsOverdue = totalCount;
		this.requestUpdate('_pagingTotalResultsOverdue', oldValue);
	}

	_isOverdueOnLastPage() {
		return this._pagingTotalResultsOverdue && this._pageSize && this._page && Math.ceil(this._pagingTotalResultsOverdue / this._pageSize) === this._page;
	}

	_lastOverduePageHasMoreThanHalf() {
		return this._pagingTotalResultsOverdue && this._pageSize && (this._pagingTotalResultsOverdue === this._pageSize || (this._pagingTotalResultsOverdue % this._pageSize) > (this._pageSize / 2));
	}

	async _onPageChange(e) {
		this._page = e.detail.page;
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

	_renderPagination() {
		let totalPages = Math.ceil(this._pagingTotalResultsUpcomming / this._pageSize) + Math.ceil(this._pagingTotalResultsOverdue / this._pageSize);
		if (!this._lastOverduePageHasMoreThanHalf()) {
			totalPages -= 1;
		}
		return this._loaded && !this.collapsed  ? html`
			<d2l-labs-pagination
				page-number="${this._page}"
				max-page-number="${totalPages}"
				@pagination-page-change="${this._onPageChange}"></d2l-labs-pagination>
		` : null;
	}
}

customElements.define('d2l-w2d-collections', W2dCollections);
