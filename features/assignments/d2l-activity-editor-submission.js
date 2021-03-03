import '../../components/activity/type/d2l-activity-type.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodyCompactStyles, bodySmallStyles, heading3Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LitElement } from 'lit-element/lit-element.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class ActivityEditorSubmission extends HypermediaStateMixin(LitElement) {

	static get styles() {
		const styles = [
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			labelStyles,
			radioStyles,
			selectStyles];

		super.styles && styles.unshift(super.styles);

		return styles;
	}

	render() {
		return html`
			<d2l-labs-accordion-collapse
				class="accordion"
				flex
				header-border
				?disabled="${this.skeleton}"
				?no-icons="${this.skeleton}">
				<h3 class="d2l-heading-3 d2l-skeletize" slot="header">
					Submission Completion and Categorization
				</h3>
				<ul class="d2l-body-small d2l-skeletize" slot="summary">
					<li>${this._renderTypeSummary()}</li>
				</ul>

				${this._renderType()}
			</d2l-labs-accordion-collapse>
		`;
	}

	_renderType() {
		return html`
			<div id="assignment-type-container">
				<label class="d2l-label-text">
					Assignment Type
				</label>
				<d2l-activity-type-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-type-editor>
			</div>
		`;
	}

	_renderTypeSummary() {
		return html`<d2l-activity-type-summary href="${this.href}" .token="${this.token}"></d2l-activity-type-summary>`;
	}

}

customHypermediaElement('d2l-activity-editor-submission', ActivityEditorSubmission, null, 'assignment');
