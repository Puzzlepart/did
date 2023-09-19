import { mergeClasses } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './DynamicSearchBox.module.scss'
import { IDynamicSearchBoxProps } from './types'
import { useDynamicSearchBox } from './useDynamicSearchBox'

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
  const { setSearchTerm, value, contentBefore } = useDynamicSearchBox(props)
  return (
    <SearchBox
      id={props.id}
      className={mergeClasses(DynamicSearchBox.className, props.className)}
      placeholder={props.placeholder}
      value={value}
      onChange={(_event, data) => {
        setSearchTerm(data.value)
      }}
      appearance={props.appearance}
      contentBefore={contentBefore}
      onBlur={props.onBlur}
      contentAfter={
        <DynamicButton
          className={styles.clearSearch}
          subtle
          iconName={props.clearSearchIconName}
          onClick={() => {
            setSearchTerm('')
            props.onClear()
          }}
          fadeIn={value.length > 0}
        />
      }
    />
  )
}

DynamicSearchBox.displayName = 'DynamicSearchBox'
DynamicSearchBox.className = styles.dynamicSearchBox
DynamicSearchBox.defaultProps = {
  clearSearchIconName: 'Dismiss',
  appearance: 'underline',
  onClear: () => {
    // Default onClear function does nothing
  }
}
