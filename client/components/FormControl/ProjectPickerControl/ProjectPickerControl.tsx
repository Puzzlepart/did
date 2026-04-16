import { SearchProject } from 'components/SearchProject'
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup
} from '@fluentui/react-components'
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
  const { onSelected, onRemove, filterFunc } = useProjectPickerControl(props)
  const selectedValues = props.multiple
    ? (Array.isArray(props.model.value(props.name))
        ? props.model.value(props.name)
        : [])
    : null

  return (
    <div className={styles.projectPickerControl}>
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
        selectedKey={props.multiple ? undefined : props.model.value(props.name)}
      />
      {selectedValues && selectedValues.length > 0 && (
        <TagGroup
          className={styles.selectedTags}
          onDismiss={(_, { value }) => onRemove(value)}
        >
          {selectedValues.map((value: string) => (
            <InteractionTag key={value} value={value}>
              <InteractionTagPrimary hasSecondaryAction>
                {value}
              </InteractionTagPrimary>
              <InteractionTagSecondary />
            </InteractionTag>
          ))}
        </TagGroup>
      )}
    </div>
  )
}

ProjectPickerControl.displayName = 'ProjectPickerControl'
ProjectPickerControl.className = styles.projectPickerControl
ProjectPickerControl.defaultProps = {}
