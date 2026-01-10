import { useAppContext } from 'AppContext'
import { Breadcrumb } from 'components'
import React from 'react'
import { MobileView } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { StyledComponent } from 'types'
import styles from './MobileBreadcrumb.module.scss'
import { IMobileBreadcrumbProps } from './types'
import { useMobileBreadcrumb } from './useMobileBreadcrumb'

/**
 * @category Function Component
 */
export const MobileBreadcrumb: StyledComponent<IMobileBreadcrumbProps> = (
  props
) => {
  const appContext = useAppContext()
  if (!appContext.isAuthenticated) return null
  const items = useMobileBreadcrumb(props)
  if (!items.length) return null
  return (
    <MobileView>
      <FadeIn>
        <Breadcrumb className={MobileBreadcrumb.className} items={items} />
      </FadeIn>
    </MobileView>
  )
}

MobileBreadcrumb.displayName = 'MobileBreadcrumb'
MobileBreadcrumb.className = styles.mobileBreadcrumb
