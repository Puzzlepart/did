import { Label as LabelElement, Shimmer } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import React, { useContext } from 'react'
import { StyledComponent } from 'types'
import styles from './Information.module.scss'
import { IInformationPropertyProps } from './types'

export const InformationProperty: StyledComponent<IInformationPropertyProps> = (props) => {
  const { loading } = useContext(CustomersContext)
  return (
    <Shimmer className={InformationProperty.className} isDataLoaded={!loading}>
      <div hidden={props.value === null || props.value === ''}>
        <LabelElement>{props.title}:</LabelElement>
        <span>{props.value}</span>
        {props.children}
      </div>
    </Shimmer>
  )
}

InformationProperty.displayName = 'InformationProperty'
InformationProperty.className = styles.informationProperty
