import '@brightspace-ui/core/components/icons/icon.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

/**
 * Activity Icon foundation component that displays an icon when given an activity href.
 * Looks for a subentity for configurable icon support. Defaults to standard mappings depending on the activity class
 */
class ActivityIcon extends SkeletonMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			_classes: { type: Array, observable: observableTypes.classes },
			_configuredIcon: { type: Object, observable: observableTypes.subEntity, rel: 'icon',
				method: (icon) => icon.class.includes('tier2') && icon
			}
		};
	}

	/**
	 * Standard mappings for icons
	 */
	static get components() {
		return {
			'learning-path': 'tier1:exemption-add',
			'course-offering': 'tier1:course',
			'user-assignment-activity': 'tier2:assignments',
			'user-checklist-activity': 'tier2:checklist',
			'user-content-activity': 'tier2:content',
			'user-course-offering-activity-usage': 'tier2:syllabus',
			'user-discussion-activity': 'tier2:discussions',
			'user-quiz-activity': 'tier2:quizzing',
			'user-quiz-attempt-activity': 'tier2:quizzing',
			'user-survey-activity': 'tier2:surveys',
			default: 'tier1:quizzing'
		};
	}

	constructor() {
		super();
		this._classes = [];
	}

	render() {
		let icon = ActivityIcon.components.default;
		if (this._configuredIcon) {
			icon = `tier2:${this._configuredIcon.properties.iconSetKey}`;
		} else {
			this._classes.some(hmClass => {
				if (!ActivityIcon.components[hmClass]) return false;
				icon = ActivityIcon.components[hmClass];
				return true;
			});
		}
		return html`
			<d2l-icon icon="${icon}" class="d2l-skeletize"></d2l-icon>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}
customElements.define('d2l-activity-icon', ActivityIcon);
