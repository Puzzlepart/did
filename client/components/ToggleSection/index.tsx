import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import styles from './ToggleSection.module.scss'
import { IToggleSectionProps } from './types'

export const ToggleSection: FunctionComponent<IToggleSectionProps> = (
  props: IToggleSectionProps
) => {
  const isExpandedStorageKey = useMemo(
    () => [ToggleSection.displayName, props.id, 'isExpanded'].join('_').toLowerCase(),
    [props.id]
  )
  const [isExpanded, toggle] = useState(sessionStorage.getItem(isExpandedStorageKey) === 'true')

  useEffect(() => {
    sessionStorage.setItem(isExpandedStorageKey, JSON.stringify(isExpanded))
  }, [isExpanded, isExpandedStorageKey])

  return (
    <div className={`${styles.root} ${props.className}`}>
      <div className={styles.header} onClick={() => toggle(!isExpanded)}>
        <div className={styles.title}>{props.headerText}</div>
        <Icon className={styles.chevron} iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'} />
      </div>
      <div hidden={!isExpanded}>{props.children}</div>
    </div>
  )
}

ToggleSection.displayName = 'ToggleSection'
