import { defaultTemplateProcessor} from 'lit-html';
import { HypermediaResult, custom} from './HypermediaResult.js'

export function customHypermediaElement(tag, elementClass, pseudoTag, hypermediaClasses, options) {
	custom(tag, elementClass, pseudoTag, hypermediaClasses, options);
}

export function html(strings, ...values) {
	let result = new HypermediaResult(strings, values, 'html', defaultTemplateProcessor);
	result.processing()
	return result;
}
