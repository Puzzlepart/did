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
  const [items, disabled] = useSearchProject(props)
  return (
    <AutocompleteControl
      {...props}
      disabled={disabled}
      title={disabled ? props.disabledText : undefined}
      items={items}
      onSelected={(item) => props.onSelected(item?.data)}
      autoFocus={props.autoFocus}
    />
  )
}

SearchProject.displayName = 'SearchProject'
SearchProject.defaultProps = {
  filterFunc: () => true
}
