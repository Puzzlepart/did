/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { isBrowser } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import styles from './MobileBreadcrumb.module.scss'
import { IMobileBreadcrumbProps } from './types'

/**
 * @category Function Component
 */
export const MobileBreadcrumb: FunctionComponent<IMobileBreadcrumbProps> = (
  props: IMobileBreadcrumbProps
) => {
  const { state } = useAppContext()
  const nav = Object.keys(state.nav || {})
  const items: IBreadcrumbItem[] = [
    {
      key: 'current',
      text: props.text,
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
    <FadeIn delay={250}>
      <Breadcrumb className={styles.root} items={items} />
    </FadeIn>
  )
}

export * from './types'
export * from './useMobileBreadcrumb'
