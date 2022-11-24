import { Label as LabelElement, Shimmer } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import React, { FC, useContext } from 'react'
import styles from './Information.module.scss'
import { IInformationPropertyProps } from './types'

export const InformationProperty: FC<IInformationPropertyProps> = (props) => {
  const { loading } = useContext(CustomersContext)
  return (
    <Shimmer className={styles.property} isDataLoaded={!loading}>
      <div hidden={props.value === null || props.value === ''}>
        <LabelElement>{props.title}:</LabelElement>
        <span>{props.value}</span>
        {props.children}
      </div>
    </Shimmer>
  )
}
