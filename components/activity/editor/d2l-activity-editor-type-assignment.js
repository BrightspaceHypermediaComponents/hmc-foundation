import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

const rels = Object.freeze({
	folderType: 'https://assignments.api.brightspace.com/rels/folder-type'
});
const assignmentTypes = Object.freeze({
	individual: 'individual',
	noGroupType: 'no-group-type',
	hasSubmissions: 'has-submissions'
});

class ActivityEditorTypeAssignment extends RtlMixin(HypermediaLitMixin(LitElement)) {

	static get properties() {
		return {
			// todo: we don't have selfless entities, so we're just grabbing the raw thing for now
			entity: { type: Object, observable: observableTypes.entity },
			groupCategoryName: { type: String, observable: observableTypes.property, id: 'groupName',  route:[{observable: observableTypes.subEntity, rel: rels.folderType}]},
			_folderTypeClasses: { type: Object, observable: observableTypes.classes, route:[{observable: observableTypes.subEntity, rel: rels.folderType}]}
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			radioStyles,
			selectStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-help-text {
					display: block;
					max-width: 300px;
					width: 100%;
				}
				.d2l-body-small {
					margin: 0.5rem 0 0.3rem 0;
				}
				.d2l-body-compact {
					margin: 0 0 0.3rem 0;
				}
				.d2l-group-info {
					padding-left: 1.8rem;
				}
				.d2l-info-text {
					margin: 0.1rem 0 0 0;
					padding-left: 1.7rem;
				}
				.d2l-individual-type {
					margin: 0 0 0.5rem 0;
				}
			`
		];
	}

	get isIndividual() {
		return this._folderTypeClasses?.some((item) => item === assignmentTypes.individual);
	}

	render() {
		const folderTypeText =	this.isIndividual ? 'Individual Assignment' : 'Group Assignment';
		const groupTypeText = !this.isIndividual && this.groupCategoryName
			? `Group Category "${this.groupCategoryName}"`
			: '';
		return html`
		<div id="read-only-assignment-type-container">
			<div class="d2l-body-compact">${folderTypeText}</div>
			<div class="d2l-body-compact">${groupTypeText}</div>
		</div>
		`;
	}

}

customHypermediaElement(
	'd2l-activity-editor-type-assignment',
	ActivityEditorTypeAssignment,
	'd2l-activity-editor-type',
	'assignment'
);
