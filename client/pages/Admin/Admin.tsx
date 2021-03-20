/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { FlexiblePivot, PivotItem } from 'components/FlexiblePivot'
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
    <FlexiblePivot
      className={styles.root}
      fixedLinkWidth={true}
      onLinkClick={({ props }) => {
        setView(props.itemKey)
        history.push(`/admin/${props.itemKey}`)
      }}
      selectedKey={view}>
      {sections.map(
        (section) =>
          !section.hidden && (
            <PivotItem
              {...section}
              key={section.itemKey}
              className={styles.tab}>
              {section.component}
            </PivotItem>
          )
      )}
    </FlexiblePivot>
  )
}

export * from './ApiTokens'
export * from './Labels'
export * from './Roles'
export * from './Users'
