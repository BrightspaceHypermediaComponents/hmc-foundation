import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeFoundationType } from './lang/localization.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityType extends SkeletonMixin(LocalizeFoundationType(HypermediaStateMixin(LitElement))) {
	static get properties() {
		return {
			classes: { type: Array, observable: observableTypes.classes }
		};
	}

	static get styles() {
		return [ super.styles ];
	}

	static get components() {
		return {
			'learning-path': 'label-learningPath',
			'course-offering': 'label-course',
			default: 'label-activity'
		};
	}

	constructor() {
		super();
		this.classes = [];
		this.skeleton = true;
	}

	render() {
		let type = ActivityType.components.default;
		this.classes && this.classes.some(hmClass => {
			if (!ActivityType.components[hmClass]) return;
			type = ActivityType.components[hmClass];
			return true;
		});
		return html`
			<span class="d2l-skeletize">${this.localize(type)}</span>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}

customHypermediaElement('d2l-activity-type', ActivityType);
