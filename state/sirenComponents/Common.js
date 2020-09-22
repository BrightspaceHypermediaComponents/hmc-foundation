export class Component {
	constructor() {
		this._components = new Map();
		this._methods = new WeakMap();
	}

	get components() {
		return this._components;
	}

	add(component, property, method) {
		if (this._components.has(component)) {
			return;
		}
		this._components.set(component, property);
		method && this._methods.set(component, method);
	}

	setProperty(value) {

		this._components.forEach((property, component) => {
			const method = this._methods.has(component) && this._methods.get(component);
			component[property] = method ? method(value) : value;
		});
	}

	setComponentProperty(component, value) {
		if (!this._components.has(component)) {
			return false;
		}
		const method = this._methods.has(component) && this._methods.get(component);

		component[this._components.get(component)] = method ? method(value) : value;
	}

	delete(component) {
		this._methods.delete(component);
		return this._components.delete(component);
	}

}

export function getEntityIdFromSirenEntity(entity) {
	const self = entity.hasLinkByRel && entity.hasLinkByRel('self') && entity.getLinkByRel && entity.getLinkByRel('self');
	return  entity.href || (self && self.href);
}
