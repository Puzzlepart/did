import icons from '@uifabric/icons/lib/data/AllIconNames.json'
import { ISuggestionItem } from 'components'
import { useMemo } from 'react'
import s from 'underscore.string'
import { getFluentIcons } from 'utils/getFluentIcon'

/**
 * Returns all icons from [@uifabric/icons](https://www.npmjs.com/package/@uifabric/icons)
 * as an array of `ISuggestionItem`
 *
 * @param includeFluentIcons - Whether to include Fluent UI 2 icons.
 *
 * @category React Hook
 */
export function useFabricIcons(includeFluentIcons = false): ISuggestionItem[] {
  return useMemo(() => {
    return [...icons, ...(includeFluentIcons && getFluentIcons())]
      .filter(Boolean)
      .filter((icon) => !!icon.name)
      .map(({ name }) => ({
        key: name,
        text: name,
        searchValue: [name, s.humanize(name)].join(' '),
        iconName: name,
        data: name
      }))
  }, [includeFluentIcons])
}
