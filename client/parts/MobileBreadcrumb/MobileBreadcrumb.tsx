import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React from 'react'
import { MobileView } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { StyledComponent } from 'types'
import styles from './MobileBreadcrumb.module.scss'
import { IMobileBreadcrumbProps } from './types'

/**
 * @category Function Component
 */
export const MobileBreadcrumb: StyledComponent<IMobileBreadcrumbProps> = (
  props
) => {
  const appContext = useAppContext()
  if(!appContext.isAuthenticated) return null
  const nav = Object.keys(appContext.state.nav || {})
  const items: IBreadcrumbItem[] = [
    {
      key: 'current',
      text: props.page.text,
      isCurrentItem: nav.length === 0
    },
    ...nav.map((key, index) => ({
      key,
      text: appContext.state.nav[key].text,
      isCurrentItem: index === nav.length - 1
    }))
  ]
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
