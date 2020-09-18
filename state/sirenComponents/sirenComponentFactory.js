import { SirenAction } from './SirenAction.js';
import { SirenClasses } from './SirenClasses.js';
import { SirenEntity } from './SirenEntity.js';
import { SirenLink } from './SirenLink.js';
import { SirenProperty } from './SirenProperty.js';
import { SirenSubEntities } from './SirenSubEntities.js';
import { SirenSubEntity } from './SirenSubEntity.js';

export const observableTypes = Object.freeze({
	property: 1,
	link: 2,
	classes: 3,
	subEntities: 4,
	entity: 5,
	subEntity: 6,
	action: 7
});

const observableClasses = Object.freeze({
	[observableTypes.classes]: SirenClasses,
	[observableTypes.entity]: SirenEntity,
	[observableTypes.link]: SirenLink,
	[observableTypes.property]: SirenProperty,
	[observableTypes.subEntity]: SirenSubEntity,
	[observableTypes.subEntities]: SirenSubEntities,
	[observableTypes.action]: SirenAction
});

function defaultBasicInfo({observable: type, prime, rel: id, route, token}) {
	return {
		id,
		route,
		token: (prime || route) ? token : undefined,
		type
	};
}

function handleRouting(componentProperties) {
	if (!componentProperties.route || componentProperties.route.length === 0) return componentProperties;

	const currentProperties = componentProperties.route.shift();
	return {...componentProperties, ...currentProperties, route: componentProperties};

}

export function sirenComponentBasicInfo(componentProperties, state) {
	componentProperties = handleRouting(componentProperties);
	const sirenComponentType = componentProperties.observable && observableClasses[componentProperties.observable];
	if (!sirenComponentType) {
		return;
	}

	const specailBasicInfo = sirenComponentType.basicInfo ? sirenComponentType.basicInfo(componentProperties) : {};

	return {...defaultBasicInfo(componentProperties), ...specailBasicInfo, state};
}

export function sirenComponentFactory(componentProperties) {
	const sirenComponentType = componentProperties.type && observableClasses[componentProperties.type];
	if (!sirenComponentType) {
		throw new Error('Bad siren component');
	}

	return new sirenComponentType(componentProperties);
}
