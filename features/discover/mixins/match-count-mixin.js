const rels = Object.freeze({
	user: 'https://api.brightspace.com/rels/user'
});

export const MatchCountMixin = superclass => class extends superclass {

	async getMatchData(summonAction, conditions, includeUsers, userLimit) {
		const conditionFilter = this._createConditionFilter(conditions, includeUsers, userLimit);
		if (conditionFilter.match.length > 0) {
			const sirenReponse = await summonAction.summon(conditionFilter, {bypassCache: true});
			if (sirenReponse) {
				return {
					count: sirenReponse.properties.count,
					...(includeUsers && { users: sirenReponse.entities?.map(user => this._getUserHrefs(user)) })
				};
			}
		}
		return null;
	}

	_createConditionFilter(conditions, includeUsers, userLimit) {
		const matchArray = [];
		conditions.forEach(condition => {
			if (condition.properties.state ?.includes('remove')) {
				return;
			}

			if (condition.properties.values.length > 0) {
				matchArray.push({
					attr: condition.properties.id,
					op: condition.properties.values.length > 1 ? '$in' : '$eq',
					value: condition.properties.values.length > 1 ? condition.properties.values : condition.properties.values[0]
				});
			}
		});
		return {
			match: matchArray,
			...(includeUsers === true && { includeUsers: includeUsers }),
			...(userLimit && { limit: userLimit })
		};
	}

	_getUserHrefs(user) {
		const userLink =  user.links?.find(l => l.rel.includes(rels.user));
		return userLink?.href;
	}
};
