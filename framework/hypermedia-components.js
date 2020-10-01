import { defaultTemplateProcessor } from 'lit-html';
import { custom, HypermediaResult } from './HypermediaResult.js'

export function customHypermediaElement(tag, elementClass, pseudoTag, hypermediaClasses, options) {
	custom(tag, elementClass, pseudoTag, hypermediaClasses, options);
}

export function html(strings, ...values) {
	return new HypermediaResult(strings, values, 'html', defaultTemplateProcessor);
}
