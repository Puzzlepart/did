import { SearchProject } from 'components/SearchProject'
import React from 'react'
import { FormInputControlComponent } from '../types'
import styles from './ProjectPickerControl.module.scss'
import { IProjectPickerControlProps } from './types'
import { useProjectPickerControl } from './useProjectPickerControl'
import _ from 'lodash'

/**
 * @category Reusable Component
 */
export const ProjectPickerControl: FormInputControlComponent<
  IProjectPickerControlProps
> = (props) => {
  const { onSelected, filterFunc } = useProjectPickerControl(props)
  return (
    <SearchProject
      {..._.pick(
        props,
        'hidden',
        'label',
        'description',
        'placeholder',
        'disabledText',
        'maxSuggestions',
        'onRenderText'
      )}
      filterFunc={props.all ? undefined : filterFunc}
      onSelected={onSelected}
      selectedKey={props.model.value(props.name)}
    />
  )
}

ProjectPickerControl.displayName = 'ProjectPickerControl'
ProjectPickerControl.className = styles.projectPickerControl
ProjectPickerControl.defaultProps = {}
