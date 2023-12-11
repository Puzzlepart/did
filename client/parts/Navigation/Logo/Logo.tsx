import packageFile from 'package'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import { StyledComponent } from 'types'
import { isMobile } from 'react-device-detect'
import { mergeClasses } from '@fluentui/react-components'

export const Logo: StyledComponent = () => {
  return (
    <Link
      to={{ pathname: '/', state: { prevPath: location.pathname } }}
      className={mergeClasses(Logo.className, isMobile && styles.mobile)}
      title={`${packageFile.name} - ${packageFile.description}`}
    >
      {packageFile.name}
    </Link>
  )
}

Logo.displayName = 'Logo'
Logo.className = styles.logo
