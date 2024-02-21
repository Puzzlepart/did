import React from 'react'
import { StyledComponent } from 'types'
import styles from './Divider.module.scss'

export const Divider: StyledComponent = () => (
  <div className={Divider.className}></div>
)

Divider.displayName = 'Divider'
Divider.className = styles.divider
