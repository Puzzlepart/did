import { ILabelProps, Label as LabelElement } from '@fluentui/react'
import React from 'react'
import styles from './Information.module.scss'

interface IInformationPropertyProps extends ILabelProps {
    value?: string
}

export const InformationProperty: React.FC<IInformationPropertyProps> = (props) => {
  return (
      <div className={styles.property} hidden={props.value === null || props.value === ''}>
        <LabelElement>{props.title}:</LabelElement>
        <span>{props.value}</span>
        {props.children}
      </div>
  )
}
