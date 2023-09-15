import { mergeClasses } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import { DynamicButton } from 'components/DynamicButton'
import React, { useEffect, useState } from 'react'
import { StyledComponent } from 'types'
import styles from './DynamicSearchBox.module.scss'
import { IDynamicSearchBoxProps } from './types'

/**
 * DynamicSearchBox is a wrapper around the `SearchBox` component from `@fluentui/react-search-preview`
 * enabling proper clearing of the search box. It also has default appearance of `underline` and
 * fills the width of the parent container.
 *
 * @category Function Component
 */
export const DynamicSearchBox: StyledComponent<IDynamicSearchBoxProps> = (
  props
) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    props.onChange(searchTerm.toLowerCase())
  }, [searchTerm])

  return (
    <SearchBox
      className={mergeClasses(DynamicSearchBox.className, props.className)}
      placeholder={props.placeholder}
      value={searchTerm}
      onChange={(_event, data) => {
        setSearchTerm(data.value)
      }}
      appearance={props.appearance}
      contentAfter={
        <DynamicButton
          className={styles.clearSearch}
          subtle
          iconName={props.clearSearchIconName}
          onClick={() => setSearchTerm('')}
          fadeIn={searchTerm.length > 0}
        />
      }
    />
  )
}

DynamicSearchBox.displayName = 'DynamicSearchBox'
DynamicSearchBox.className = styles.dynamicSearchBox
DynamicSearchBox.defaultProps = {
  clearSearchIconName: 'Dismiss',
  appearance: 'underline'
}
