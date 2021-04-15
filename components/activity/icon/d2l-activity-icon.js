import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
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
			_configuredIcon: { type: Object, observable: observableTypes.subEntities, rel: 'icon',
				method: (icons) => {
					for (const icon of icons) {
						if (icon.class.includes('tier2')) return icon;
					}
				},
				route: [{observable: observableTypes.link, rel: 'https://api.brightspace.com/rels/content'}]
			},
			_childContentClasses: {
				type: Array,
				observable: observableTypes.classes,
				route: [{observable: observableTypes.subEntity, rel: 'https://activities.api.brightspace.com/rels/child-user-activity-usage'}]
			}
		};
	}

	static get styles() {
		const styles = [css`
			.d2l-activity-icon {
				color: var(--d2l-activity-icon-color);
			}
		`];

		super.styles && styles.unshift(super.styles);
		return styles;
	}

	/**
	 * Standard mappings for icons
	 */
	static get components() {
		return {
			'user-survey-activity': 'tier2:surveys',
			'learning-path': 'tier1:exemption-add',
			'course-offering': 'tier1:course',
			'user-assignment-activity': 'tier2:assignments',
			'user-checklist-activity': 'tier2:checklist',
			'user-content-activity': 'tier2:content',
			'user-course-offering-activity-usage': 'tier2:syllabus',
			'user-discussion-activity': 'tier2:discussions',
			'user-quiz-activity': 'tier2:quizzing',
			'user-quiz-attempt-activity': 'tier2:quizzing',
			default: 'tier1:quizzing'
		};
	}

	constructor() {
		super();
		this.skeleton = true;
		this._classes = [];
		this._childContentClasses = [];
	}

	render() {
		let icon = ActivityIcon.components.default;
		if (this._configuredIcon) {
			icon = this._configuredIcon.properties.iconSetKey;
		} else {
			const classes = this._childContentClasses.length > 0 ? this._childContentClasses : this._classes;
			classes.some(hmClass => {
				if (!ActivityIcon.components[hmClass]) return false;
				icon = ActivityIcon.components[hmClass];
				return true;
			});
		}
		return html`
			<d2l-icon icon="${icon}" class="d2l-skeletize d2l-activity-icon"></d2l-icon>
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
