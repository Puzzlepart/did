import { Shimmer } from '@fluentui/react'
import { Label } from '@fluentui/react-components'
import { CustomersContext } from 'pages/Customers/context'
import React, { useContext } from 'react'
import { StyledComponent } from 'types'
import styles from './CustomerInformation.module.scss'
import { IInformationPropertyProps } from './types'

export const InformationProperty: StyledComponent<IInformationPropertyProps> = (
  props
) => {
  const { loading } = useContext(CustomersContext)
  return (
    <Shimmer className={InformationProperty.className} isDataLoaded={!loading}>
      <div hidden={props.value === null || props.value === ''}>
        <div>
          <Label weight={props.weight}>{props.title}:</Label>
        </div>
        <span>{props.value}</span>
        {props.children}
      </div>
    </Shimmer>
  )
}

InformationProperty.defaultProps = {
  weight: 'semibold'
}

InformationProperty.displayName = 'InformationProperty'
InformationProperty.className = styles.informationProperty
