/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Autocomplete } from '../Autocomplete'
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
    <Autocomplete
      {...props}
      disabled={disabled}
      items={items}
      itemIcons={{
        style: {
          marginTop: 8,
          fontSize: 16
        }
      }}
      width={props.width}
      placeholder={props.placeholder}
      onClear={() => props.onSelected(null)}
      onSelected={(item) => props.onSelected(item.data)}
    />
  )
}
