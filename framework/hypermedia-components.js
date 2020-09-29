import { componentStoreFactory, isPseudoTag } from '../render/componentFactory.js';
import { defaultTemplateProcessor, html as litHtml, TemplateResult } from 'lit-html';
import { fetch, stateFactory } from '../state/store.js';
import { observableTypes } from '../state/HypermediaState.js';
import { until } from 'lit-html/directives/until.js';

export function customHypermediaElement(tag, elementClass, pseudoTag, hypermediaClasses, options) {
	pseudoTag = pseudoTag || tag;
	const components = componentStoreFactory(pseudoTag);
	components.register(tag, hypermediaClasses);
	customElements.define(tag, elementClass, options);
}

export function html(strings, ...values) {
	const stringCollections = [{strings: [], values: []}];
	strings = [...strings];
	const tagStack = [];
	let currentCollection = stringCollections[0];
	for (let i = 0; i < strings.length; i++) {
		let currentString = strings[i];
		// todo: Check that this logic is working
		const currentValue = values[i];
		let currentStringPosition = 0;
		// eslint-disable-next-line no-useless-escape
		const outputs = [...strings[i].matchAll(/\<([A-Za-z][A-Za-z0-9\-]*)|\<\/([A-Za-z][A-Za-z0-9\-]*)\>/g)];
		outputs.forEach(output => {
			if (output[1] && isPseudoTag(output[1])) {
				tagStack.push(output[1]);
				if (tagStack.length === 1) {
					currentCollection.strings.push(currentString.substring(0, output.index - currentStringPosition));
					currentCollection = {strings: [], values: []};
					stringCollections.push(currentCollection);
					currentString = currentString.substring(output.index - currentStringPosition);
					currentStringPosition = output.index;
				}
			}
			if (output[2] && output[2] === tagStack[tagStack.length - 1]) {
				tagStack.pop();
				if (tagStack.length === 0) {
					currentCollection.strings.push(currentString.substring(0, output.index + output[0].length - currentStringPosition));
					stringCollections[0].values.push(renderHypermediaComponent(output[2], currentCollection.strings, currentCollection.values));
					currentCollection = stringCollections[0];
					currentString = currentString.substring(output.index + output[0].length - currentStringPosition);
					currentStringPosition = output.index + output[0].length;
				}
			}
		});

		currentCollection.strings.push(currentString);
		if (i < values.length) {
			currentCollection.values.push(currentValue);
		}
	}

	return new TemplateResult(stringCollections[0].strings, stringCollections[0].values, 'html', defaultTemplateProcessor);
}

function renderHypermediaComponent(pseudoTag, strings, values) {
	const [href, token] = getHrefToken(strings, values);
	const observable = {
		classes: { type: Array, observable: observableTypes.classes }
	};
	const resources = { classes: [] };
	const components = componentStoreFactory(pseudoTag);
	if (!href || !token) return litHtml`loading`;
	const statePromise = stateFactory(href, token);
	const fetchedResults  = statePromise.then(async state => {
		state.addObservables(resources, observable);
		await fetch(state);
		return state;
	}).then(state => render(state, components, resources, pseudoTag, strings, values));
	return litHtml`${until(fetchedResults, litHtml`loading`)}`;
}

function getHrefToken(strings, values) {
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

function render(state, components, resources, pseudoTag, strings, values) {
	const tag = components.componentTag(resources.classes);
	if (!tag) return null;

	const mainStrings = [], mainValues = [];
	while (strings.length > 0) {
		let string = strings.shift();
		if (!string) break;
		string = string.replace(pseudoTag, tag);
		const indexOfEndTag = string.indexOf('>');
		if (indexOfEndTag === -1) {
			mainStrings.push(string);
			mainValues.push(values.shift());
			continue;
		}

		const subStringValue = string.substring(indexOfEndTag);
		string = string.substring(0, indexOfEndTag + 1);
		mainStrings.push(string);
		strings.unshift(subStringValue);
		break;
	}
	strings.pop();
	if (strings.length !== 0) {
		mainStrings.push(`</${tag}>`);
		mainValues.push(html(strings, values));
	} else {
		mainStrings[mainStrings.length - 1] += `</${tag}>`;
	}

	//dispose(state);
	return new TemplateResult(mainStrings, mainValues, 'html', defaultTemplateProcessor);
}
