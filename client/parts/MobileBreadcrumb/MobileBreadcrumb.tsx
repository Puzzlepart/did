import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React from 'react'
import { isBrowser } from 'react-device-detect'
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
  const { state } = useAppContext()
  const nav = Object.keys(state.nav || {})
  const items: IBreadcrumbItem[] = [
    {
      key: 'current',
      text: props.page.text,
      isCurrentItem: nav.length === 0
    },
    ...nav.map((key, index) => ({
      key,
      text: state.nav[key].text,
      isCurrentItem: index === nav.length - 1
    }))
  ]
  if (isBrowser) return null
  return (
    <div hidden={props.hidden}>
      <FadeIn delay={250}>
        <Breadcrumb className={MobileBreadcrumb.className} items={items} />
      </FadeIn>
    </div>
  )
}

MobileBreadcrumb.className = styles.mobileBreadcrumb
