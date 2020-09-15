import { observableTypes as ot, sirenComponentBasicInfo, sirenComponentFactory } from './sirenComponents/sirenComponentFactory.js';
import { refreshToken } from './token.js';

export const observableTypes = ot;

/**
 *
 * @export
 * @class HypermediaState
 */
export class HypermediaState {
	constructor(entityId, token) {
		this._entityId = entityId;
		this._token = token;

		this._decodedEntity = new Map();
	}

	get entityId() {
		return this._entityId;
	}

	get token() {
		return this._token;
	}

	addObservables(component, observables) {
		Object.keys(observables).forEach((name) => {
			const propertyInfo = {
				name,
				token: this.token,
				...observables[name]
			};

			const basicInfo = sirenComponentBasicInfo(propertyInfo);
			if (!basicInfo) return;

			const sirenComponent = this._getSirenComponent(basicInfo);
			sirenComponent.addComponent(component, name, { route: basicInfo.route ? {[name]: basicInfo.route} : undefined, method: observables[name].method });
		});
	}

	dispose(component) {
		this._decodedEntity.forEach(typeMap => {
			typeMap.forEach(sirenComponent => {
				sirenComponent.deleteComponent(component);
			});
		});
	}

	refreshToken() {
		return refreshToken(this.token);
	}

	onServerResponse(entity, error) {
		if (!entity) throw error;
		this.setSirenEntity(entity);
	}

	hasServerResponseCached() {
		return !!this._entity;
	}

	setSirenEntity(entity) {
		this._entity = entity;
		this._decodedEntity.forEach(typeMap => {
			typeMap.forEach(sirenComponent => {
				sirenComponent.setSirenEntity(entity, typeMap);
			});
		});
	}

	_getMap(map, identifier) {
		if (map.has(identifier)) {
			return map.get(identifier);
		}

		map.set(identifier, new Map());
		return map.get(identifier);
	}

	_getSirenComponent(basicInfo) {
		const typeMap = this._getMap(this._decodedEntity, basicInfo.type);
		if (typeMap.has(basicInfo.id)) return typeMap.get(basicInfo.id);

		const sirenComponent = sirenComponentFactory(basicInfo);
		typeMap.set(basicInfo.id, sirenComponent);
		this._entity && sirenComponent.setSirenEntity(this._entity, typeMap);

		return sirenComponent;
	}
}
