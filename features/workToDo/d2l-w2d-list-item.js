import '@brightspace-ui/core/components/list/list-item-content.js';
import '../../components/activity/description/d2l-activity-description.js';
import '../../components/activity/icon/d2l-activity-icon.js';
import '../../components/activity/name/d2l-activity-name.js';
import '../../components/activity/type/d2l-activity-type.js';
import '../../components/activity/name/custom/d2l-activity-name-course.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { guard } from 'lit-html/directives/guard';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin.js';

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

class W2DListItemMixin extends HypermediaStateMixin(ListItemLinkMixin(LitElement)) {

	static get properties() {
		return {
			_dates: {
				type: Object,
				observable: observableTypes.subEntities,
				rel: rels.date,
				method: (dates) => {
					const datesByType = {};
					dates.forEach(date => {
						Object.keys(dateTypes).forEach((type) => date.class.includes(dateTypes[type]) && (datesByType[type] = date.properties.localizedDate));
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
			.d2l-w2d-list-item-name {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		`];

		super.styles && styles.unshift(super.styles);
		return styles;
	}

	constructor() {
		super();
		this._dates = {};
		this._isCourse = false;
	}

	render() {
		if (!this._loaded) return this._renderSkeleton();
		const iconClasses = {
			'd2l-hovering': this._hoveringPrimaryAction,
			'd2l-focusing': this._focusingPrimaryAction,
		};

		return this._renderListItem({
			illustration: html`<d2l-activity-icon href="${this.href}" .token="${this.token}" class="${classMap(iconClasses)}"></d2l-activity-icon>`,
			content: html`${guard([this.href, this.token], () => html`
				<d2l-list-item-content>
					<d2l-activity-name class="d2l-w2d-list-item-name" href="${this.href}" .token="${this.token}"></d2l-activity-name>
					<div slot="secondary">
						${this._isCourse ? html`Course` : html`<d2l-activity-name-course href="${this.href}" .token="${this.token}"></d2l-activity-name-course>`}
						<div>Due Date: ${this._dates.due}</div>
						<div>End Date: ${this._dates.end}</div>
						<div>Start Date: ${this._dates.start}</div>
						<div>Type: <d2l-activity-type href="${this.href}" .token="${this.token}"></d2l-activity-type></div>
					</div>
					<d2l-activity-description slot="supporting-info" href="${this.href}" .token="${this.token}"></d2l-activity-description>
				</d2l-list-item-content>
			`)}`
		});
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
}
customHypermediaElement('d2l-w2d-list-item-quiz', W2DListItemQuiz, 'd2l-w2d-list-item', [['user-quiz-activity'], ['user-quiz-attempt-activity']]);
