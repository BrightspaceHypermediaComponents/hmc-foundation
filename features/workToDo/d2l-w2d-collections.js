import './d2l-w2d-list.js';
import './d2l-w2d-no-activities.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui-labs/pagination/pagination.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { clearLoading } from '@brightspace-hmc/foundation-engine/state/loader.js';
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
			useFirstName: { type: Boolean, attribute: 'use-first-name' },
			overdueGroupByDays: { type: Number, attribute: 'overdue-group-by-days' },
			startDate: { type: String, attribute: 'start-date' },
			endDate: { type: String, attribute: 'end-date' },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			upcomingWeekLimit: { type: String, attribute: 'upcoming-week-limit' },
			skeleton: { type: Boolean, reflect: true },
			userUrl: { type: String, attribute: 'user-url' },
			allowUnclickableActivities: { type: Boolean, attribute: 'allow-unclickable-activities' },
			clickableFutureActivities: { type: Boolean, attribute: 'clickable-future-activities' },
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
					start: 'startDate',
					end: 'endDate',
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
					pageSize: '_pageSize',
					page: '_pageOverdue'
				}],
				method: (categories) => Object.keys(categories).sort((a, b) => a - b).map(key => categories[key])
			},
			_totalActivities: {
				type: Number,
				name: 'totalActivities',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					start: 'startDate',
					end: 'endDate',
					pageSize: '_pageSize',
					page: '_pageUpcoming'
				}]
			},
			_pageSize: { type: Number },
			_page: { type: Number },
			_currentPageUpcoming: {
				type: Number,
				name: 'currentPage',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					start: 'startDate',
					end: 'endDate',
					pageSize: '_pageSize',
					page: '_pageUpcoming'
				}]
			},
			_pagingTotalResultsUpcoming: {
				type: Number,
				name: 'pagingTotalResults',
				observable: observableTypes.property,
				route: [{
					observable: observableTypes.custom,
					observableObject: W2dSummonAction,
					name: 'filter-work-to-do',
					start: 'startDate',
					end: 'endDate',
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
			.d2l-w2d-collection-fixed {
				position: absolute;
				height: 100%;
				width: 100%;
				background: white;
				z-index: 500;
			}
			.d2l-w2d-collection-overflow {
				overflow: hidden;
				width: 1rem;
				height: 10rem;
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
		this._pagingTotalResultsUpcoming = 0;
		this._pagingTotalResultsOverdue = 0;
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
		let limit = this._pageSize;
		let overdue = null;
		if (!this._isOverduePastLastPage() || this._isOverdueOnLastPage()) {
			overdue = this._overdue.map(category => {
				let header = this.localize('overdue');
				if (!this.collapsed) {
					header = this._renderDate(category.startDate, category.endDate, this.collapsed);
				}
				if (limit === 0) return;
				const list = html`
					${this._renderHeader3(header, this._pagingTotalResultsOverdue)}
					<d2l-w2d-list
						href="${category.href}"
						.token="${this.token}"
						category="${category.index}"
						?collapsed="${this.collapsed}"
						limit="${ifDefined(limit)}"
						?allow-unclickable-activities="${this.allowUnclickableActivities}"
						?clickable-future-activities="${this.clickableFutureActivities}">
					</d2l-w2d-list>
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
					${this._renderHeader3(header, this._pagingTotalResultsUpcoming)}
					<d2l-w2d-list
						href="${category.href}"
						.token="${this.token}"
						category="${category.index}"
						?collapsed="${this.collapsed}"
						limit="${ifDefined(limit)}"
						?allow-unclickable-activities="${this.allowUnclickableActivities}"
						?clickable-future-activities="${this.clickableFutureActivities}">
					</d2l-w2d-list>
				`;
				limit = limit === undefined ? limit : Math.max(limit - category.count, 0);
				return list;
			});
		}
		if (categories) {
			categories = categories.filter(activity => activity !== undefined);
		}
		const lists = html`
			<div class="${classMap({ 'd2l-w2d-collection-overflow': this.skeleton })}">
				${overdue && overdue.length !== 0 ? this._renderHeader2(this.localize('overdue'), this._pagingTotalResultsOverdue) : null}
				${overdue}
				${categories && categories.length > 0 ? this._renderHeader2(this.localize('upcoming'), this._pagingTotalResultsUpcoming) : null}
				${categories}
				${this.dataFullPagePath && this._loaded && this.collapsed && this._totalActivities > 6 ? html`<d2l-link href="${this.dataFullPagePath}">${this.localize('fullViewLink')}</d2l-link>` : null}
				${this._renderPagination()}
			</div>
		`;
		const emptyList = html`
				<d2l-w2d-no-activities
					class="${classMap({ 'd2l-w2d-collection-overflow': this.skeleton })}"
					?activities="${this._totalActivities !== 0}"
					?collapsed="${this.collapsed}"
					?complete="${!this.collapsed}"
					?use-first-name="${this.useFirstName}"
					data-full-page-path="${ifDefined(this.dataFullPagePath)}"
					upcoming-week-limit="${this.upcomingWeekLimit}"
					.token="${this.token}"
					href=${this.userUrl}></d2l-w2d-no-activities>
			`;

		return html`
			${this._renderSkeleton()}
			${(!overdue || overdue.length === 0) && (!categories || categories.length === 0) ? emptyList : lists}
		`;
	}

	get _currentPageOverdue() {
		return this.__currentPageOverdue;
	}

	set _currentPageOverdue(page) {
		if (typeof page !== 'number') return;
		const oldValue = this.__currentPageOverdue;
		this.__currentPageOverdue = page;
		this.requestUpdate('_currentPageOverdue', oldValue);
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	get _page() {
		return this.__page;
	}

	set _page(page) {
		const oldValue = this._page;
		this.__page = page;
		this.requestUpdate('_page', oldValue);
	}

	get _pageSize() {
		return this.__pageSize;
	}

	set _pageSize(pageSize) {
		const oldValue = this._pageSize;
		this.__pageSize = pageSize;
		this.requestUpdate('_pageSize', oldValue);
	}

	get _pagingTotalResultsOverdue() {
		return this.__pagingTotalResultsOverdue;
	}

	set _pagingTotalResultsOverdue(totalCount) {
		const oldValue = this.__pagingTotalResultsOverdue;
		this.__pagingTotalResultsOverdue = totalCount;
		this.requestUpdate('_pagingTotalResultsOverdue', oldValue);
	}

	_isOverdueOnLastPage() {
		return this._pagingTotalResultsOverdue && this._pageSize && this._page && Math.ceil(this._pagingTotalResultsOverdue / this._pageSize) === this._page;
	}

	_isOverduePastLastPage() {
		return this._pagingTotalResultsOverdue && this._pageSize && this._page && Math.ceil(this._pagingTotalResultsOverdue / this._pageSize) <= this._page;
	}

	_lastOverduePageHasMoreThanHalf() {
		return this._pagingTotalResultsOverdue && this._pageSize && (this._pagingTotalResultsOverdue === this._pageSize || (this._pagingTotalResultsOverdue % this._pageSize) > (this._pageSize / 2));
	}

	async _onPageChange(e) {
		this._loaded = false;
		await this.updateComplete;
		clearLoading();
		this._page = e.detail.page;
	}

	get _pageOverdue() {
		return (this.__pageSize && typeof this.__page === 'number' && this.__pagingTotalResultsOverdue) ? Math.min(this._page, Math.ceil(this.__pagingTotalResultsOverdue / this.__pageSize)) : 1;
	}

	get _pageUpcoming() {
		if (!this._isOverduePastLastPage()) return 1;
		let page = typeof this.__page === 'number' ? Math.max(1, this.__page - this._pageOverdue) : 1;
		if (!this.collapsed && !this._lastOverduePageHasMoreThanHalf() && this.__page !== 1) {
			page++;
		}
		return page;
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
		const screenReaderText = this.localize('xActivities', 'count', count);
		return html`
			<div class="d2l-w2d-flex">
				<h2 class="d2l-heading-2">${heading}</h2>
				<div class="d2l-w2d-count d2l-w2d-heading-2-count" aria-label="${screenReaderText}"><span aria-hidden="true">${count}</span></div>
			</div>
		`;
	}

	_renderHeader3(heading, count) {
		if (!this.collapsed) return html`<div class="d2l-w2d-flex"><h3 class="d2l-w2d-heading-3">${heading}</h3></div>`;
		const screenReaderText = this.localize('xActivities', 'count', count);
		return html`
			<div class="d2l-w2d-flex">
				<h3 class="d2l-w2d-heading-3 d2l-heading-3">${heading}</h3>
				<div class="d2l-w2d-count d2l-w2d-heading-3-count" aria-label="${screenReaderText}"><span aria-hidden="true">${count}</span></div>
			</div>
		`;
	}

	_renderPagination() {
		let totalPages = Math.ceil(this._pagingTotalResultsUpcoming / this._pageSize) + Math.ceil(this._pagingTotalResultsOverdue / this._pageSize);
		if (this._pagingTotalResultsOverdue && this._pagingTotalResultsUpcoming && !this._lastOverduePageHasMoreThanHalf()) {
			totalPages -= 1;
		}
		if (totalPages < 1) {
			totalPages = 1;
		}
		return !this.skeleton && !this.collapsed  ? html`
			<d2l-labs-pagination
				page-number="${this._page}"
				max-page-number="${totalPages}"
				@pagination-page-change="${this._onPageChange}"></d2l-labs-pagination>
		` : null;
	}

	_renderSkeleton() {
		if (!this.skeleton) return null;
		return html`
			<div class="d2l-w2d-collection-fixed">
				${!this.collapsed ? html`<h2 class="d2l-skeletize d2l-heading-2">${this.localize('overdue')}</h2>` : null}
				<h3 class="d2l-skeletize d2l-w2d-heading-3 d2l-heading-3">May 14 - May 23</h3>
				<d2l-w2d-list skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list>
			</div>
		`;
	}
}

customElements.define('d2l-w2d-collections', W2dCollections);
