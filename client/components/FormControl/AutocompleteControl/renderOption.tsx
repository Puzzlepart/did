import { Icon } from '@fluentui/react'
import React from 'react'
import styles from './AutocompleteControl.module.scss'
import { ISuggestionItem } from './types'

/**
 * Renders an option for the `AutocompleteControl` component.
 *
 * @param s The suggestion item to render.
 *
 * @returns The rendered option as any to be able to use it within the `<Option />` component.
 */
export const renderOption = (s: ISuggestionItem<any>): any => {
  return (
    <div className={styles.option}>
      <div className={styles.container}>
        <div className={styles.icon} hidden={!s.iconName}>
          <Icon iconName={s.iconName} />
        </div>
        <div className={styles.content}>
          <div className={styles.text}>{s.text}</div>
          <div className={styles.secondaryText}>{s.secondaryText}</div>
        </div>
      </div>
    </div>
  )
}
