import { getLocalizeResources } from '../../../../lang/localizeResources.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LocalizeFoundationDescription = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, 'components/activity/description');
	}
};
