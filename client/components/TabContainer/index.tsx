/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { Pivot } from '@fluentui/react-react'
import React from 'react'
import { renderTabs } from './renderTabs'
import { TabContainerComponent } from './types'
import { useTabContainer } from './useTabContainer'

/**
 * Flexible tab container
 *
 * It's highly recommended for children of this component
 * to use `TabComponent`
 *
 * Adds styles **display: flex** and **flex-wrap: wrap**
 * to make the `<Pivot >` mobile friendly
 *
 * @category Function Component
 */
export const TabContainer: TabContainerComponent = (props) => {
  const { user } = useAppContext()
  const { styles, ref } = useTabContainer(props)
  return (
    <Pivot {...props} ref={ref} styles={styles}>
      {renderTabs({
        tabs: props.children,
        props: props.itemProps,
        user
      })}
    </Pivot>
  )
}

export * from './types'
