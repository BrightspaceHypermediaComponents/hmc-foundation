import { bodyStandardStyles, heading2Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeCollectionAdd } from '../../lang/localize-collection-add.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityCollectionEditorQuizEmpty extends SkeletonMixin(RtlMixin(HypermediaStateMixin(LocalizeCollectionAdd(LitElement)))) {

	static get properties() {
		return {};
	}

	static get styles() {
		return [super.styles, heading2Styles, bodyStandardStyles, css`
			.d2l-heading-2 {
				margin-bottom: 1rem;
				margin-top: 3rem;
				text-align: center;
			}
			.d2l-body-standard {
				padding-bottom: 3rem;
				text-align: center;
			}`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`
			<div>
				<div class="d2l-heading-2 d2l-skeletize">
					${this.localize('text-readyToBeginAddingQuizContent')}
				</div>
				<div class="d2l-body-standard d2l-skeletize">
					${this.localize('text-clickAddExistingOrCreateNewToGetStarted')}
				</div>
			</div>
		`;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}
}

customElements.define('d2l-activity-collection-editor-quiz-empty', ActivityCollectionEditorQuizEmpty);
