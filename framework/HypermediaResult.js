import { componentStoreFactory, isPseudoTag } from '../render/componentFactory.js';
import { defaultTemplateProcessor, TemplateResult } from 'lit-html';
import { fetch, stateFactory } from '../state/store.js';
import { html } from '../framework/hypermedia-components.js';
import { observableTypes } from '../state/HypermediaState.js';
import { until } from 'lit-html/directives/until.js';

export function custom(tag, elementClass, pseudoTag, hypermediaClasses, options) {
	pseudoTag = pseudoTag || tag;
	const components = componentStoreFactory(pseudoTag);
	components.register(tag, hypermediaClasses);
	customElements.define(tag, elementClass, options);
}

/**
 * Extension to the TemplateResult class from lit-html
 * Contains the logic for replacing pseudotags with tags
 */
export class HypermediaResult extends TemplateResult {

	constructor(strings, values, type, processor) {
		super(strings, values, type, processor);
		this.processing();
	}

	/*
	* Function called on HypermediaResult object to get the associated html
	* Should process the base tag if this is the first call to getHTML
	* otherwise, retrieves previous processing
	*/
	getHTML() {
		return super.getHTML();
	}

	/*
	* Function called on a HypermediaResult to process the strings
	* most importantly, this finds any base tags that exist and starts
	* the process to recursively resolve them
	* - strings is an array of strings of length n
	* - values is an array of length n-1 html values
	* strings[0] + values[0] + strings[1] + values[1] + ... + strings[n-1] + values[n-1] + strings[n]
	*   forms an html string
	*/

	processing() {
		const stringCollections = [{ strings: [], values: [] }];
		const tagStack = [];
		const strings = [...this.strings];
		const values = [...this.values];
		let currentCollection = stringCollections[0];

		// check each string and replace pseudotags
		for (let i = 0; i < strings.length; i++) {
			let currentString = strings[i];
			const currentValue = values[i];
			let currentStringPosition = 0;
			/* Finds all tags in the current string
			*  each element of output is defined as
			*  output[0] - entire string matched
			*  output[1] - tagname if it matches <tagname
			*  output[2] - tagname if it matched <\tagname
			*  output.index: the first index of tagname including prefix in strings[i]
			*/
			// eslint-disable-next-line no-useless-escape
			const outputs = [...strings[i].matchAll(/\<([A-Za-z][A-Za-z0-9\-]*)|\<\/([A-Za-z][A-Za-z0-9\-]*)\>/g)];
			outputs.forEach(output => {
				// the tag is an opening tag and a pseudotag
				if (output[1] && isPseudoTag(output[1])) {
					tagStack.push(output[1]);
					/*
					*  if this is the only pseudotag on the stack, it is a top level pseudotag
					*  store information about where this element starts
					*  starts a new stringCollection to store all strings and values for this element
					*/
					if (tagStack.length === 1) {
						currentCollection.strings.push(currentString.substring(0, output.index - currentStringPosition));
						currentCollection = { strings: [], values: [] };
						stringCollections.push(currentCollection);
						currentString = currentString.substring(output.index - currentStringPosition);
						currentStringPosition = output.index;
					}
				}

				// the tag is closing tag and a pseudotag
				if (output[2] && output[2] === tagStack[tagStack.length - 1]) {
					tagStack.pop();
					/*
					*  if this is the last pseudotag on the stack, the top level element is complete
					*  the data for this element is processed to replace pseudotags and for the interior data to be processed
					*/
					if (tagStack.length === 0) {
						currentCollection.strings.push(currentString.substring(0, output.index + output[0].length - currentStringPosition));
						// this call is recursive and handles interior pseudotags

						stringCollections[0].values.push(this.renderHypermediaComponent(output[2], currentCollection.strings, currentCollection.values));
						currentCollection = stringCollections[0];
						currentString = currentString.substring(output.index + output[0].length - currentStringPosition);
						currentStringPosition = output.index + output[0].length;
					}
				}
			});

			// store the data for the strings and values to be used when processing further strings

			currentCollection.strings.push(currentString);
			if (i < values.length) {
				currentCollection.values.push(currentValue);
			}
		}

		// updates the data in the object to be the processed data
		super.strings = stringCollections[0].strings;
		super.values = stringCollections[0].values;
	}

	/*
	*  Retrieves href data based on the strings and value of the element
	*  uses this information to fetch data and send it to be rendered
	*/
	renderHypermediaComponent(pseudoTag, strings, values) {
		const [href, token] = this.getHrefToken(strings, values);
		const observable = {
			classes: { type: Array, observable: observableTypes.classes }
		};
		const resources = { classes: [] };
		const components = componentStoreFactory(pseudoTag);
		if (!href || !token) return html`loading`;
		const statePromise = stateFactory(href, token);
		const fetchedResults  = statePromise.then(async state => {
			state.addObservables(resources, observable);
			await fetch(state);
			return state;
		}).then(state => this.render(state, components, resources, pseudoTag, strings, values));
		return html`${until(fetchedResults, html`loading`)}`;
	}

	/*
	*  Determines the href and token associated with the current element
	*/

	getHrefToken(strings, values) {
		let href, token;
		strings = [...strings];
		strings.forEach((string, index) => {
			const output = [...string.matchAll(/(token=)|(href=)/g)].pop();
			if (output && output[1]) {
				token = values[index];
			} else if (output && output[2]) {
				href = values[index];
			}
		});
		return [href, token];
	}

	/*
	*  Completes the rendering for the object
	*  Replaces all pseudotags with their appropriate tag
	*/
	render(state, components, resources, pseudoTag, strings, values) {
		const tag = components.componentTag(resources.classes);
		// if there is no registered tag, bail out
		if (!tag) return null;

		const mainStrings = [], mainValues = [];
		while (strings.length > 0) {
			let string = strings.shift();
			if (!string) break;

			// replace the pseudotag with the real tag for the element
			string = string.replace(`<${pseudoTag} `, `<${tag} `);
			string = string.replace(`</${pseudoTag} `, `</${tag} `);
			const indexOfEndTag = string.indexOf('>');
			// if the current string doesn't end with '>', store the updated string and associated value

			if (indexOfEndTag === -1) {
				mainStrings.push(string);
				mainValues.push(values.shift());
				continue;
			}

			// when we do find a '>', store the data until the end of the element

			const subStringValue = string.substring(indexOfEndTag);
			string = string.substring(0, indexOfEndTag + 1);
			mainStrings.push(string);
			strings.unshift(subStringValue);
			break;
		}
		strings.pop();

		/*
		*  if we are not at the end of the strings, we must further process the rest of the data
		*  otherwise, we are done with this element
		*/
		if (strings.length !== 0) {
			mainStrings.push(`</${tag}>`);
			/*
			*  This call to html results in the internal components of this tag being resolved
			*  processed into a HypermediaResult
			*/

			mainValues.push(html(strings, values));
		} else {
			mainStrings[mainStrings.length - 1] += `</${tag}>`;
		}

		// return all of this information as a HypermediaResult to be stored as a value for a different Result

		return new HypermediaResult(mainStrings, mainValues, 'html', defaultTemplateProcessor);
	}
}
