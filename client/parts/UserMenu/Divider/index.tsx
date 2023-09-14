import React from 'react'
import styles from './Divider.module.scss'
import { StyledComponent } from 'types'

export const Divider: StyledComponent = () => <div className={Divider.className}></div>

Divider.displayName = 'Divider'
Divider.className = styles.divider