import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeFoundationType } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityType extends SkeletonMixin(LocalizeFoundationType(HypermediaStateMixin(LitElement))) {
	static get properties() {
		return {
			_classes: { type: Array, observable: observableTypes.classes },
			_childContentClasses: {
				type: Array,
				observable: observableTypes.classes,
				route: [{observable: observableTypes.subEntity, rel: 'https://activities.api.brightspace.com/rels/child-user-activity-usage'}]
			}
		};
	}

	static get styles() {
		return [ super.styles ];
	}
	/**
	 * Standard mappings for type label
	 */
	static get components() {
		return {
			'user-survey-activity': 'label-surveys',
			'learning-path': 'label-learningPath',
			'course-offering': 'label-course',
			'user-assignment-activity': 'label-assignment',
			'user-checklist-activity': 'label-checklist',
			'user-content-activity': 'label-content',
			'user-course-offering-activity-usage': 'label-course',
			'user-activity-usage': 'label-course',
			'user-discussion-activity': 'label-discussion',
			'user-quiz-activity': 'label-quiz',
			'user-quiz-attempt-activity': 'label-quiz',
			default: 'label-activity'
		};
	}

	constructor() {
		super();
		this._classes = [];
		this._childContentClasses = [];
		this.skeleton = true;
	}

	render() {
		let type = ActivityType.components.default;
		const classes = this._childContentClasses.length > 0 ? this._childContentClasses : this._classes;
		classes.some(hmClass => {
			if (!ActivityType.components[hmClass]) return;
			type = ActivityType.components[hmClass];
			return true;
		});
		return html`<span class="d2l-skeletize">${this.localize(type)}</span>`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}

customHypermediaElement('d2l-activity-type', ActivityType);
