/* eslint-disable tsdoc/syntax */
import { Pivot, PivotItem } from 'office-ui-fabric-react'
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
    <div className={styles.root}>
      <Pivot selectedKey={view || 'users'} onLinkClick={onPivotClick}>
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
      </Pivot>
    </div>
  )
}

export * from '../Reports/SummaryView'
export * from './ApiTokens'
export * from './Labels'
export * from './Roles'
export * from './Users'
