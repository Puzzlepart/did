import { Icon } from '@fluentui/react'
import React, { ReactElement } from 'react'
import styles from './AutocompleteControl.module.scss'
import { ISuggestionItem } from './types'

/**
 * Renders an option for the `AutocompleteControl` component.
 *
 * @param s The suggestion item to render.
 */
export const renderOption = ({
  iconName,
  text,
  secondaryText
}: ISuggestionItem<any>): ReactElement => {
  return (
    <div className={styles.option}>
      <div className={styles.container}>
        <div className={styles.icon} hidden={!iconName}>
          <Icon iconName={iconName} />
        </div>
        <div className={styles.content}>
          <div className={styles.text}>{text}</div>
          <div className={styles.secondaryText} hidden={!secondaryText}>
            {secondaryText}
          </div>
        </div>
      </div>
    </div>
  )
}
