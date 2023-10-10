/* eslint-disable react/no-children-prop */
import { Shimmer } from '@fluentui/react'
import { FieldLabel } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './InformationProperty.module.scss'
import { IInformationPropertyProps } from './types'

export const InformationProperty: StyledComponent<IInformationPropertyProps> = (
  props
) => {
  return (
    <Shimmer
      className={InformationProperty.className}
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
