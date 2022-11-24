import { Pivot } from '@fluentui/react'
import { useAppContext } from 'AppContext'
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
 * @category Reusable Component
 */
export const TabContainer: TabContainerComponent = (props) => {
  const { user } = useAppContext()
  const { styles, onLinkClick, selectedKey } = useTabContainer(props)
  return (
    <Pivot
      {...props}
      onLinkClick={onLinkClick}
      selectedKey={selectedKey}
      styles={styles}
    >
      {renderTabs({
        tabs: props.children,
        props: props.itemProps,
        user
      })}
    </Pivot>
  )
}

TabContainer.defaultProps = {
  level: 2,
  fixedLinkWidth: false,
  linkHeight: 30,
  hideIconsMobile: true
}

export * from './types'
