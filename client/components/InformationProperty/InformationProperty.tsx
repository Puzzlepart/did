import { Shimmer } from '@fluentui/react'
import { FieldLabel } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './InformationProperty.module.scss'
import { IInformationPropertyProps } from './types'
import { mergeClasses } from '@fluentui/react-components'

export const InformationProperty: StyledComponent<IInformationPropertyProps> = (
  props
) => {
  if (props.hidden) return null
  return (
    <Shimmer
      className={mergeClasses(InformationProperty.className, props.className)}
      isDataLoaded={props.isDataLoaded}
    >
      <div hidden={props.value === null || props.value === ''}>
        <FieldLabel
          text={props.title}
          hidden={props.value === null || props.value === ''}
        />
        {props.onRenderValue(props.value)}
        {props.children}
      </div>
    </Shimmer>
  )
}

InformationProperty.displayName = 'InformationProperty'
InformationProperty.className = styles.informationProperty
InformationProperty.defaultProps = {
  onRenderValue: (value) => <span>{value}</span>
}
