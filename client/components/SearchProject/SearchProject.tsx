import { ReusableComponent } from 'components/types'
import React from 'react'
import { AutocompleteControl } from '../FormControl/AutocompleteControl'
import { ISearchProjectProps } from './types'
import { useSearchProject } from './useSearchProject'

/**
 * Search for projects using `<Autocomplete />`
 *
 * @category Reusable Component
 */
export const SearchProject: ReusableComponent<ISearchProjectProps> = (
  props
) => {
  const [items, disabled] = useSearchProject()

  return (
    <AutocompleteControl
      {...props}
      disabled={disabled}
      items={items}
      placeholder={props.placeholder}
      onSelected={(item) => props.onSelected(item.data)}
      autoFocus={props.autoFocus} />
  )
}