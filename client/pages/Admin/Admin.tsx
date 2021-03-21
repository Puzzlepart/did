/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { TabContainer } from 'components/TabContainer'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styles from './Admin.module.scss'
import { useSections } from './useSections'

/**
 * @category Function Component
 */
export const Admin = () => {
  const sections = useSections()
  const params = useParams<{ view: string }>()
  const [view, setView] = useState(params.view || 'users')
  const history = useHistory()

  return (
    <TabContainer
      className={styles.root}
      fixedLinkWidth={true}
      onLinkClick={({ props }) => {
        setView(props.itemKey)
        history.push(`/admin/${props.itemKey}`)
      }}
      selectedKey={view}>
      {sections.map(
        ({ itemKey, headerText, itemIcon, hidden, component: Component }) =>
          !hidden && (
            <Component
              key={itemKey}
              itemKey={itemKey}
              headerText={headerText}
              itemIcon={itemIcon}
            />
          )
      )}
    </TabContainer>
  )
}

export * from './ApiTokens'
export * from './Labels'
export * from './Roles'
export * from './Users'
