import { Component } from './Common.js';

export class SirenEntity {
	constructor() {
		this._components = new Component();
	}

	get sirenEntity() {
		return this._sirenEntity;
	}

	set sirenEntity(sirenEntity) {
		if (!this._sirenEntity !== sirenEntity) {
			this._components.setProperty(sirenEntity);
		}
		this._sirenEntity = sirenEntity;
	}

	addComponent(component, property, {method}) {
		this._components.add(component, property, method);
		this._components.setComponentProperty(component, this.sirenEntity);
	}

	deleteComponent(component) {
		this._components.delete(component);
	}

	setSirenEntity(sirenEntity) {
		this.sirenEntity = sirenEntity;
	}
}
