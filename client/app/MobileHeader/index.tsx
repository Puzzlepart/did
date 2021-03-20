/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { Breadcrumb } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
import FadeIn from 'react-fade-in'
import styles from './MobileHeader.module.scss'
import { IMobileHeaderProps } from './types'

/**
 * @category Function Component
 */
export const MobileHeader: FunctionComponent<IMobileHeaderProps> = (
  props: IMobileHeaderProps
) => {
  const { state } = useContext(AppContext)
  const items = [
    {
      key: 'current',
      text: props.text,
      isCurrentItem: !state?.current?.nav?.headerText
    }
  ]
  if (state?.current?.nav?.headerText) {
    items.push({
      key: state?.current?.nav?.itemKey,
      text: state?.current?.nav?.headerText,
      isCurrentItem: true
    })
  }
  return (
    <FadeIn delay={250}>
      <Breadcrumb className={styles.root} items={items} />
    </FadeIn>
  )
}

export * from './types'
