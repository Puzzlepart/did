import icons from '@uifabric/icons/lib/data/AllIconNames.json'
import { ISuggestionItem } from 'components'
import { useMemo } from 'react'
import s from 'underscore.string'

/**
 * Returns all icons from [@uifabric/icons](https://www.npmjs.com/package/@uifabric/icons)
 * as an array of `ISuggestionItem`
 *
 * @category React Hook
 */
export function useFabricIcons(): ISuggestionItem[] {
  return useMemo(
    () =>
      icons
        .filter((icon) => !!icon.name)
        .map(({ name }) => ({
          key: name,
          text: name,
          searchValue: [name, s.humanize(name)].join(' '),
          iconName: name,
          data: name
        })),
    []
  )
}
