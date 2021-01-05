import { getLocalizeResources } from 'LocalizeResources';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LocalizeX = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, 'location');
	}
};
