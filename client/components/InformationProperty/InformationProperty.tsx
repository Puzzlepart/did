import { Skeleton, SkeletonItem } from '@fluentui/react-components'
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
  const isDataLoaded = props.isDataLoaded ?? true
  return (
    <div
      className={mergeClasses(InformationProperty.className, props.className)}
    >
      {isDataLoaded ? (
        <div hidden={props.value === null || props.value === ''}>
          <FieldLabel
            text={props.title}
            hidden={props.value === null || props.value === ''}
          />
          {props.onRenderValue(props.value)}
          {props.children}
        </div>
      ) : (
        <Skeleton>
          <SkeletonItem style={{ width: '100%', height: 16 }} />
        </Skeleton>
      )}
    </div>
  )
}

InformationProperty.displayName = 'InformationProperty'
InformationProperty.className = styles.informationProperty
InformationProperty.defaultProps = {
  onRenderValue: (value) => <span>{value}</span>
}
