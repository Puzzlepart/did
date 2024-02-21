import React from 'react'
import { StyledComponent } from 'types'
import styles from './HorizontalSection.module.scss'

export const HorizontalSection: StyledComponent = (props) => {
  return <div className={HorizontalSection.className}>{props.children}</div>
}

HorizontalSection.displayName = 'HorizontalSection'
HorizontalSection.className = styles.horizontalSection
