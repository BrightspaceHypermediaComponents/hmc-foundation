import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/status-indicator/status-indicator.js';
import '../../components/activity/description/d2l-activity-description.js';
import '../../components/activity/icon/d2l-activity-icon.js';
import '../../components/activity/name/d2l-activity-name.js';
import '../../components/activity/type/d2l-activity-type.js';
import '../../components/activity/name/custom/d2l-activity-name-course.js';
import './d2l-w2d-attribute-list.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { guard } from 'lit-html/directives/guard';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';
import { nothing } from 'lit-html';

const rels = Object.freeze({
	assignment: 'https://api.brightspace.com/rels/assignment',
	checklist: 'https://checklists.api.brightspace.com/rels/checklist-item',
	content: 'https://api.brightspace.com/rels/content',
	date: 'https://api.brightspace.com/rels/date',
	organization: 'https://api.brightspace.com/rels/organization',
	organizationHomepage: 'https://api.brightspace.com/rels/organization-homepage',
	quiz: 'https://api.brightspace.com/rels/quiz',
	topic: 'https://discussions.api.brightspace.com/rels/topic'
});

const dateTypes = Object.freeze({
	due: 'due-date',
	end: 'end-date',
	start: 'start-date'
});

class W2DListItemMixin extends HypermediaStateMixin(ListItemLinkMixin(LocalizeDynamicMixin(LitElement))) {

	static get properties() {
		return {
			collapsed: { type: Boolean },
			_hasStarted: { type: Boolean, observable: observableTypes.classes, method: (classes) => classes.includes('started') },
			_dates: {
				type: Object,
				observable: observableTypes.subEntities,
				rel: rels.date,
				method: (dates) => {
					const datesByType = {};
					dates.forEach(date => {
						Object.keys(dateTypes).forEach((type) => date.class.includes(dateTypes[type]) && (datesByType[type] = date.properties.localizedDate && new Date(date.properties.localizedDate)));
					});
					return datesByType;
				}
			}
		};
	}

	static get styles() {
		const styles = [css`
			:host([action-href]:not([action-href=""])) {
				--d2l-list-item-content-text-color: var(--d2l-color-ferrite);
			}
			:host([action-href]:not([action-href=""]):not([skeleton])) d2l-activity-icon.d2l-focusing,
			:host([action-href]:not([action-href=""]):not([skeleton])) d2l-activity-icon.d2l-hovering {
				--d2l-activity-icon-color: var(--d2l-color-celestine);
			}
			:host([collapsed]) .d2l-list-item-content {
				padding: 0.25rem 0;
			}
			.d2l-w2d-list-item-name {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.due-date {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			d2l-status-indicator {
				text-transform: none;
			}
		`];

		super.styles && styles.unshift(super.styles);
		return styles;
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this._dates = {};
		this._isCourse = false;
		this.collapsed = false;
	}

	get actionHref() {
		return ((this._dates && !this._dates.start) || this._hasStarted) ? this._actionHref : undefined;
	}

	set actionHref(href) {
		const oldHref = this.actionHref;
		this._actionHref = href;
		if (this.actionHref) {
			this.requestUpdate('actionHref', oldHref);
		}
	}

	render() {
		if (!this._loaded) return this._renderSkeleton();
		const iconClasses = {
			'd2l-hovering': this._hoveringPrimaryAction,
			'd2l-focusing': this._focusingPrimaryAction,
		};

		const startDate = (!this.actionHref && this._dates.start)
			? html`
				<d2l-status-indicator slot="supporting-info" state="none" text="Starts ${formatDate(this._dates.start, {format: 'shortMonthDay'})}"></d2l-status-indicator>
			`
			: nothing;

		return this._renderListItem({
			illustration: html`<d2l-activity-icon href="${this.href}" .token="${this.token}" class="${classMap(iconClasses)}"></d2l-activity-icon>`,
			content: html`${guard([this.href, this.token], () => html`
				<d2l-list-item-content>
					<d2l-activity-name class="d2l-w2d-list-item-name" href="${this.href}" .token="${this.token}"></d2l-activity-name>
					<d2l-w2d-attribute-list slot="secondary">
						${this._renderAttributeListCollapsed()}
					</d2l-w2d-attribute-list>
					${startDate}
					${ !this.collapsed ? html`<d2l-activity-description slot="supporting-info" href="${this.href}" .token="${this.token}"></d2l-activity-description>` : nothing}
				</d2l-list-item-content>
			`)}`
		});
	}

	_renderAttributeListCollapsed() {
		let dueDate;
		if (this._dates.due || this._dates.end) {
			dueDate = html`<div>${this._dates.due ? this.localize('dueWithDate', 'dueDate', formatDate(this._dates.due, {format: 'shortMonthDay'})) : this.localize('endWithDate', 'endDate', formatDate(this._dates.end, {format: 'shortMonthDay'}))}</div>`;
		}
		const type = html`<d2l-activity-type href="${this.href}" .token="${this.token}"></d2l-activity-type>`;
		const courseName = this._isCourse ? html`<div>${this.localize('course')}</div>` : html`<d2l-activity-name-course href="${this.href}" .token="${this.token}"></d2l-activity-name-course>`;
		return html`
			${this.collapsed ? dueDate : type}
			${courseName}
		`;
	}

	_renderSkeleton() {
		return this._renderListItem({
			illustration: html`<d2l-activity-icon skeleton></d2l-activity-icon>`,
			content: html`
				<d2l-list-item-content skeleton>
					<d2l-activity-name class="d2l-w2d-list-item-name" skeleton></d2l-activity-name>
				</d2l-list-item-content>
			`
		});
	}
}

class W2DListItem extends W2DListItemMixin {}
customHypermediaElement('d2l-w2d-list-item', W2DListItem);

class W2DListItemAssignment extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: 'alternate',
				route: [{observable: observableTypes.link, rel: rels.assignment}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-assignment', W2DListItemAssignment, 'd2l-w2d-list-item', [['user-assignment-activity']]);

class W2DListItemChecklist extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: 'alternate',
				route: [{observable: observableTypes.link, rel: rels.checklist}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-checklist', W2DListItemChecklist, 'd2l-w2d-list-item', [['user-checklist-activity']]);

class W2DListItemContent extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: 'alternate',
				route: [{observable: observableTypes.link, rel: rels.content}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-content', W2DListItemContent, 'd2l-w2d-list-item', [['user-content-activity']]);

class W2DListItemCourseOffering extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: rels.organizationHomepage,
				route: [{observable: observableTypes.link, rel: rels.organization}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	constructor() {
		super();
		this._isCourse = true;
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-course', W2DListItemCourseOffering, 'd2l-w2d-list-item', [['course-offering'], ['user-course-offering-activity-usage']]);

class W2DListItemDiscussion extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: 'alternate',
				route: [{observable: observableTypes.link, rel: rels.topic}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-discussion', W2DListItemDiscussion, 'd2l-w2d-list-item', [['user-discussion-activity']]);

class W2DListItemQuiz extends W2DListItemMixin {
	static get properties() {
		return {
			...super.properties,
			actionHref: {
				type: String,
				observable: observableTypes.link,
				rel: 'alternate',
				route: [{observable: observableTypes.link, rel: rels.quiz}],
				reflect: true,
				attribute: 'action-href'
			}
		};
	}

	get actionHref() {
		return super.actionHref;
	}

	set actionHref(href) {
		super.actionHref = href;
	}
}
customHypermediaElement('d2l-w2d-list-item-quiz', W2DListItemQuiz, 'd2l-w2d-list-item', [['user-quiz-activity'], ['user-quiz-attempt-activity']]);
