const defaultType = null;

// TODO: Organize the component tags better!
class ComponentStore {
	constructor(elementPseudoTag) {
		this._elementPseudoTag = elementPseudoTag;
		this._componentStore = new Map();
	}

	register(componentTag, types) {
		if (!types) {
			this._componentStore.set(defaultType, componentTag);
		}
		types = typeof types === 'object' ? types : [types];
		types.forEach(type => {
			type = typeof type === 'object' ? type : [type];
			let componentStore = this._componentStore;
			do {
				const typeValue = type.shift();
				componentStore = this._getNextMap(componentStore, typeValue);
			} while (type.length > 0);
			if (componentStore.has(defaultType)) {
				throw new Error(`Duplicate Hypermedia Class Type for element ${this._elementPseudoTag} with tag ${componentTag} and ${componentStore.get(defaultType)}`);
			}
			componentStore.set(defaultType, componentTag);
		});
	}

	componentTag(types) {
		if (!types) return;
		types = typeof types === 'object' ? types : [types];

		const componentTags = [];
		for (const typeIndex in types) {
			const type = types[typeIndex];
			componentTags.push(this._getComponentTag(type, types.filter(otherType => otherType !== type)));
		}
		const componentTag = this._reduceComponentTag(componentTags);
		return componentTag.componentTag;
	}

	_getComponentTag(type, otherTypes, map, depth = 0) {
		map = map ? map : this._componentStore;
		if (!map.has(type)) {
			return { componentTag: map.has(defaultType) ? map.get(defaultType) : null, depth };
		}
		map = map.get(type);
		if (!map) {
			return null;
		}
		const componentTag = {
			componentTag: map.get(defaultType),
			depth: depth
		};
		const componentTags = [componentTag];
		for (const typeIndex in otherTypes) {
			const type = otherTypes[typeIndex];
			componentTags.push(this._getComponentTag(type, otherTypes.filter(otherType => otherType !== type), map, depth + 1));

		}

		return this._reduceComponentTag(componentTags);
	}

	_reduceComponentTag(componentTags) {
		let componentTagWithMaxDepth = { componentTag: null, depth: 0 };
		componentTags.forEach(componentTag => {
			if (!componentTag || !componentTag.componentTag || componentTag.depth < componentTagWithMaxDepth.depth) return;

			componentTagWithMaxDepth = componentTag;
		});

		return componentTagWithMaxDepth;
	}

	_getNextMap(map, key) {
		if (map.has(key)) {
			return map.get(key);
		}
		const newMap = new Map();
		map.set(key, newMap);
		return newMap;
	}
}

window.D2L = window.D2L || {};
window.D2L.ComponentStore = window.D2L.ComponentStore || new Map();

export function isPseudoTag(elementPseudoTag) {
	return window.D2L.ComponentStore.has(elementPseudoTag);
}

export function componentStoreFactory(elementPseudoTag) {
	if (window.D2L.ComponentStore.has(elementPseudoTag)) {
		return window.D2L.ComponentStore.get(elementPseudoTag);
	}
	const componentStore = new ComponentStore(elementPseudoTag);
	window.D2L.ComponentStore.set(elementPseudoTag, componentStore);
	return componentStore;
}
