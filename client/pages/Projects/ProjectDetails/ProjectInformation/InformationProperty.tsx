import { Shimmer } from '@fluentui/react'
import { Label } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../context'
import styles from './ProjectInformation.module.scss'
import { IInformationPropertyProps } from './types'

export const InformationProperty: StyledComponent<IInformationPropertyProps> = (
  props
) => {
  const { loading } = useProjectsContext()
  return (
    <Shimmer className={InformationProperty.className} isDataLoaded={!loading}>
      <div hidden={props.value === null || props.value === ''}>
        <Label>{props.title}:</Label>
        <span>{props.value}</span>
        {props.children}
      </div>
    </Shimmer>
  )
}

InformationProperty.displayName = 'InformationProperty'
InformationProperty.className = styles.informationProperty
