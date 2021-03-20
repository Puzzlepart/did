/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { Breadcrumb } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
import { isBrowser } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { filter } from 'underscore'
import styles from './MobileBreadcrumb.module.scss'
import { IMobileBreadcrumbProps } from './types'

/**
 * @category Function Component
 */
export const MobileBreadcrumb: FunctionComponent<IMobileBreadcrumbProps> = (
  props: IMobileBreadcrumbProps
) => {
  const { state } = useContext(AppContext)
  const items = filter(
    [
      {
        key: 'current',
        text: props.text,
        isCurrentItem: !state.nav?.headerText
      },
      state.nav?.headerText && {
        key: state.nav?.itemKey,
        text: state.nav?.headerText,
        isCurrentItem: true
      }
    ],
    (i) => !!i
  )
  if (isBrowser) return null
  return (
    <FadeIn delay={250}>
      <Breadcrumb className={styles.root} items={items} />
    </FadeIn>
  )
}

export * from './types'
export * from './useMobileBreadcrumb'
