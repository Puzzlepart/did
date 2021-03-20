/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { Breadcrumb } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
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
  const { state } = useContext(AppContext)
  const items = [
    {
      key: 'current',
      text: props.text,
      isCurrentItem: !state?._current?.nav?.headerText
    }
  ]
  if (state?._current?.nav?.headerText) {
    items.push({
      key: state?._current?.nav?.itemKey,
      text: state?._current?.nav?.headerText,
      isCurrentItem: true
    })
  }
  if (isBrowser) return null
  return (
    <FadeIn delay={250}>
      <Breadcrumb className={styles.root} items={items} />
    </FadeIn>
  )
}

export * from './types'
export * from './useMobileBreadcrumb'
