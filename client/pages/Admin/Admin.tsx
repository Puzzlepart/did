/* eslint-disable tsdoc/syntax */
import { FlexiblePivot, PivotItem } from 'components/FlexiblePivot'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styles from './Admin.module.scss'
import { useSections } from './useSections'

/**
 * @category Function Component
 */
export const Admin = () => {
  const sections = useSections()
  const { view } = useParams<{ view: string }>()
  const history = useHistory()

  const onPivotClick = ({ props }: PivotItem) =>
    history.push(`/admin/${props.itemKey}`)

  return (
    <FlexiblePivot
      className={styles.root}
      selectedKey={view || 'users'}
      onLinkClick={onPivotClick}>
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
