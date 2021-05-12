export const MatchCountMixin = superclass => class extends superclass {

	createConditionFilter(conditions, includeUsers, userLimit) {
		const matchArray = [];
		conditions.forEach(condition => {
			if (condition.properties.state !== 'existing') {
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

	async getMatchData(summonAction, conditions, includeUsers, userLimit) {
		const conditionFilter = this.createConditionFilter(conditions, includeUsers, userLimit);
		if (conditionFilter.match.length === 0) {
			return null;
		}

		const sirenReponse = await summonAction.summon(conditionFilter);
		if (sirenReponse) {
			return {
				count: sirenReponse.properties.count,
				...(includeUsers && { users: sirenReponse.entities })
			};
		}
	}
};
