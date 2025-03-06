import _ from 'lodash'

/**
 * Retrieves the value of an extension property from an entity.
 * If a key is provided, it retrieves the value of a specific property.
 * If no key is provided, it retrieves the entire extension object.
 *
 * @template T - The type of the entity.
 * @param {T} entity - The entity object.
 *
 * @param extensionId - The ID of the extension.
 * @param key - The key of the extension property (optional).
 * @param defaultValue - The default value to return if the extension or property is not found.
 * @returns  - The value of the extension property or the entire extension object.
 */
export function useExtension<T = any, R = any>(
  entity: T,
  extensionId: string,
  key?: string,
  defaultValue = null,
  mergeWithDefault = false
): R {
  if (!key) {
    const value = _.get(
      entity,
      `extensions.${extensionId}.properties`,
      defaultValue
    ) as R
    return mergeWithDefault ? _.merge(defaultValue, value) : value
  }
  const value = _.get(
    entity,
    `extensions.${extensionId}.properties.${key}`,
    defaultValue
  ) as R
  return mergeWithDefault ? _.merge(defaultValue, value) : value
}
