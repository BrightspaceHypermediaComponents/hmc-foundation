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

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue'
});

class w2dWorkToDo extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean, reflect: true },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			fullscreen: { type: String, attribute: 'data-fullscreen' },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			_categories: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'groupByDays',
				startDate: 'currentTime',
				rel: rel.userActivity,
				route: [
					{ observable: observableTypes.link, rel: rel.myActivities }
				],
				method: (categories) => Object.values(categories)
			},
			_overdue: {
				type: Array,
				observable: observableTypes.custom,
				observableObject: W2dDateCategory,
				groupByDays: 'groupByDays',
				startDate: 'currentTime',
				rel: rel.userActivity,
				route: [
					{ observable: observableTypes.link, rel: rel.myActivities },
					{ observable: observableTypes.link, rel: rel.overdue }
				],
				method: (categories) => Object.values(categories)
			},
			_overdueHref: {
				type: String,
				observable: observableTypes.link,
				rel: rel.overdue,
				route: [
					{ observable: observableTypes.link, rel: rel.myActivities }
				]
			},
			_myActivitiesHref: { type: String, observable: observableTypes.link, rel: rel.myActivities }
		};
	}

	static get styles() {
		return [bodyStandardStyles, heading2Styles, heading3Styles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host(:not([collapsed])) {
				margin: auto;
				max-width: 1230px;
				padding: 0 52px;
			}

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
				border-radius: 0.75rem;
				border: 2px solid var(--d2l-color-carnelian-minus-1);
				box-shadow: 0 0 0 1px white;
				box-sizing: content-box;
				color: white;
				display: inline-block;
				font-weight: 400;
				line-height: 100%;
				padding: 2px;
				position: relative;
				text-align: center;
			}
			.d2l-w2d-heading-3-count {
				font-size: 0.7rem;
				min-width: 0.7rem;
			}
			.d2l-w2d-heading-2-count {
				font-size: 1.05rem;
				min-width: 1.05rem;
			}

			d2l-w2d-list {
				display: block;
				margin-bottom: 1.2rem;
			}

			.d2l-w2d-heading-1 {
				margin-top: 1.75rem;
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
		this.collapsed = true;
		this.requiredPropertyForState('currentTime');
		this.requiredPropertyForState('groupByDays');
	}

	get fullscreen() {
		return !this.collapsed;
	}

	set fullscreen(isFullscreen) {
		this.collapsed = isFullscreen !== 'True';
	}

	render() {
		let overdueCount = 0;
		const overdue = this._overdue.map(category => {
			let header = 'Overdue';
			if (!this.collapsed) {
				header = this._renderDate(category.startDate, category.endDate, this.collapsed);
			}
			overdueCount += category.count;
			return html`
				${this._renderHeader3(header, category.count)}
				<d2l-w2d-list href="${this._overdueHref}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}"></d2l-w2d-list>
			`;
		});
		let upcomingCount = 0;
		const categories = this._categories.map(category => {
			const header = this._renderDate(category.startDate, category.endDate, this.collapsed);
			upcomingCount += category.count;
			return html`
				${this._renderHeader3(header, category.count)}
				<d2l-w2d-list href="${this._myActivitiesHref}" .token="${this.token}" category="${category.index}" ?collapsed="${this.collapsed}"></d2l-w2d-list>
			`;
		});

		const immersiveNav = this.collapsed
			? null
			: html`
				<d2l-navigation-immersive back-link-href="#" back-link-text="${this.localize('backToD2L')}" width-type="normal">
					<div slot="middle" class="d2l-w2d-flex d2l-body-standard">${this.localize('myWorkToDo')}</div>
				</d2l-navigation-immersive>
			`;
		const workToDoHeader = this.collapsed
			? null
			: html`
				<h1 class="d2l-w2d-heading-1">
					${this.localize('workToDo')}
				</h1>
			`;
		return html`
			${immersiveNav}
			${workToDoHeader}
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
				<h2>${heading}</h2>
				<div class="d2l-w2d-count d2l-w2d-heading-2-count ">${count}</div>
			</div>
		`;
	}

	_renderHeader3(heading, count) {
		if (!this.collapsed) return html`<div class="d2l-w2d-flex"><h3 class="d2l-w2d-heading-3">${heading}</h3></div>`;
		return html`
			<div class="d2l-w2d-flex">
				<h3 class="d2l-w2d-heading-3">${heading}</h3>
				<div class="d2l-w2d-count d2l-w2d-heading-3-count">${count}</div>
			</div>
		`;
	}

}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
