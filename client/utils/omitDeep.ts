/**
 * Omit deep, used to remove __typename from GraphQL responses
 *
 * @see https://gist.github.com/Billy-/d94b65998501736bfe6521eadc1ab538
 *
 * @param value - Value
 * @param key - Key to omit
 */
export default function omitDeep(value: any, key: string) {
	if (Array.isArray(value)) {
		return value.map(i => omitDeep(i, key));
	}

	if (typeof value === 'object' && value !== null) {
		return Object.keys(value).reduce((newObject, k) => {
			if (k === key) {
				return newObject;
			}

			return {[k]: omitDeep(value[k], key), ...newObject};
		}, {});
	}

	return value;
}
