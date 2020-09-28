import { dispose, fetch, stateFactory } from '../state/store.js';
export { observableTypes } from '../state/HypermediaState.js';

/**
 * @export
 * @polymerMixin
 **/
export const HypermediaLitMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Href for the entity
			 */
			href: { type: String, reflect: true },
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String }
		};
	}

	constructor() {
		super();
		this.__observables = this.constructor.properties;
	}

	get _observables() {
		return deepCopy(this.__observables);
	}

	updated(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) && this.href && this.token && this.href !== 'undefined') {
			dispose(this._state, this);
			this._makeState();
		}
		super.updated(changedProperties);
	}

	connectedCallback() {
		super.connectedCallback();
		if (!this._state && this.href && this.token && this.href !== 'undefined') {
			this._makeState();
		}
	}

	disconnectedCallback() {
		dispose(this._state, this);
		super.disconnectedCallback();
	}

	async _makeState() {
		try {
			this._state = await stateFactory(this.href, this.token);
			this._state.addObservables(this, this._observables);
			await fetch(this._state);
		} catch (error) {
			console.error(error);
		}
	}

	_hasAction(action) {
		return this[action] && this[action].has;
	}
};

function deepCopy(inObject) {

	if (typeof inObject !== 'object' || inObject === null) {
		return inObject; // Return the value if inObject is not an object
	}

	// Create an array or object to hold the values
	const outObject = Array.isArray(inObject) ? [] : {};

	let value;
	for (const key in inObject) {
		value = inObject[key];

		// Recursively (deep) copy for nested objects, including arrays
		outObject[key] = deepCopy(value);
	}

	return outObject;
}
