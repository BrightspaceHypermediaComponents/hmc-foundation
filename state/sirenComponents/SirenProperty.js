import { Component } from './Common.js';

export class SirenProperty {
	static basicInfo({id, name, observable}) {
		id = id || name.replace(/^_+/, '');
		return { id, type: observable };
	}

	constructor({id}) {
		this._property = id;
		this._components = new Component();
	}

	get value() {
		return this._value;
	}

	set value(value) {
		if (!this._value !== value) {
			this._components.setProperty(value);
		}
		this._value = value;

	}

	get property() {
		return this._property;
	}

	addComponent(component, property, {method}) {
		this._components.add(component, property, method);
		this._components.setComponentProperty(component, this.value);
	}

	deleteComponent(component) {
		this._components.delete(component);
	}

	setSirenEntity(sirenEntity) {
		this.value = sirenEntity && sirenEntity.properties && sirenEntity.properties[this.property];
	}
}
