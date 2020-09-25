import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { html } from '../../../framework/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';

const rels = Object.freeze({
	releaseConditionsDialogOpener: 'https://activities.api.brightspace.com/rels/release-conditions-dialog-opener'
});
// todo: REQUIRES SELFLESS ENTITIES TO FUNCTION
class ActivityEditorAvailability extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			dialogOpener: { type: String, observable: observableTypes.property, id: 'url', route: [{observable: observableTypes.subEntity, rel: rels.releaseConditionsDialogOpener}] }
		};
	}

	render() {
		console.log('dialog opener', this.dialogOpener);

		return html`
			<d2l-labs-accordion-collapse
				flex
				header-border
				?opened=${this._isOpened()}
				?disabled="${this.skeleton}"
				?no-icons="${this.skeleton}"
				@d2l-labs-accordion-collapse-state-changed=${this._onAccordionStateChange}>
				<h3 class="d2l-heading-3 d2l-activity-summarizer-header d2l-skeletize" slot="header">
					Availability
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary d2l-skeletize" slot="summary">
					<li>${this._renderAvailabilityDatesSummary()}</li>
					<li>${this._renderReleaseConditionSummary()}</li>
					<li>${this._renderSpecialAccessSummary()}</li>
				</ul>
				${this._renderAvailabilityDatesEditor()}
				${this._renderReleaseConditionEditor()}
				${this._renderSpecialAccessEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false;
		// const activity = store.get(this.href);
		// if (!activity || !activity.dates) {
		// 	return false;
		// }

		// return !!(activity.dates.endDateErrorTerm || activity.dates.startDateErrorTerm);
	}

	_isOpened() {
		return this._opened || this._errorInAccordion();
	}

	_onAccordionStateChange(e) {
		this._opened = e.detail.opened;
	}

	_renderAvailabilityDatesEditor() {
		return html`
			<div class="d2l-editor">
				<d2l-activity-availability-dates-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>
		`;
	}

	_renderAvailabilityDatesSummary() {
		return html`
			<d2l-activity-availability-dates-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-availability-dates-summary>
		`;
	}

	_renderReleaseConditionEditor() {
		//const activity = store.get(this.href);
		// if (!this._m3ReleaseConditionsEnabled || !activity || !activity.canEditReleaseConditions) {
		// 	return nothing;
		// }

		return html`
			<div class="d2l-editor">
				<h3 class="d2l-heading-4">
					Release Conditions
				</h3>
				<d2l-activity-usage-conditions-editor
					description="Release Conditions"
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-usage-conditions-editor>
			</div>
		`;
	}
	_renderReleaseConditionSummary() {
		// if (!this._m3ReleaseConditionsEnabled) {
		// 	return nothing;
		// }

		return html`
			<d2l-activity-usage-conditions-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-usage-conditions-summary>
		`;
	}

	_renderSpecialAccessEditor() {
		//const activity = store.get(this.href);

		// if (!this._m3SpecialAccessEnabled || !activity || !activity.specialAccess) {
		// 	return nothing;
		// }

		return html`
			<div class="d2l-editor">
				<h3 class="d2l-heading-4">
					Special Access
				</h3>
				<d2l-activity-special-access-editor
					description="Special Access"
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-special-access-editor>
			</div>
		`;
	}
	_renderSpecialAccessSummary() {
		// if (!this._m3SpecialAccessEnabled) {
		// 	return nothing;
		// }

		return html`
			<d2l-activity-special-access-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-special-access-summary>
		`;
	}
}

customElements.define('d2l-activity-editor-availability', ActivityEditorAvailability);

