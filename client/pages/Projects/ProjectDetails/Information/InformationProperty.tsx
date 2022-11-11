import { Label as LabelElement } from '@fluentui/react'
import React, { FC } from 'react'
import { IInformationPropertyProps } from './types'
import styles from './Information.module.scss'

export const InformationProperty: FC<IInformationPropertyProps> = (
  props
) => {
  return (
    <div
      className={styles.property}
      hidden={props.value === null || props.value === ''}
    >
      <LabelElement>{props.title}:</LabelElement>
      <span>{props.value}</span>
      {props.children}
    </div>
  )
}
