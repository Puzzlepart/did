import { SearchProject } from 'components/SearchProject'
import React from 'react'
import { FormInputControlComponent } from '../types'
import styles from './ProjectPickerControl.module.scss'
import { IProjectPickerControlProps } from './types'
import { useProjectPickerControl } from './useProjectPickerControl'

/**
 * @category Reusable Component
 */
export const ProjectPickerControl: FormInputControlComponent<
  IProjectPickerControlProps
> = (props) => {
  const { onSelected } = useProjectPickerControl(props)
  return (
    <SearchProject
      hidden={props.hidden}
      label={props.label}
      description={props.description}
      placeholder={props.placeholder}
      filterFunc={(project) =>
        project?.customer?.key === props.model.value('customerKey')
      }
      onSelected={onSelected}
      selectedKey={props.model.value(props.name)}
    />
  )
}

ProjectPickerControl.displayName = 'ProjectPickerControl'
ProjectPickerControl.className = styles.projectPickerControl
ProjectPickerControl.defaultProps = {}
