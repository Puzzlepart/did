import React, { ReactElement } from 'react'
import { getFluentIconWithFallback } from 'utils'
import styles from './AutocompleteControl.module.scss'
import { ISuggestionItem } from './types'

/**
 * Renders an option for the `AutocompleteControl` component.
 *
 * @param option The option to render.
 */
export const renderOption = (option: ISuggestionItem<any>): ReactElement => {
  const isDisabled = (option as any).disabled
  const optionClass = isDisabled ? `${styles.option} ${styles.disabled}` : styles.option
  return (
    <div className={optionClass}>
      <div className={styles.container}>
        <div className={styles.icon} hidden={!option.iconName}>
          {getFluentIconWithFallback(option.iconName, { size: 22 })}
        </div>
        <div className={styles.content}>
          <div className={styles.text}>{option.text}</div>
          <div className={styles.secondaryText} hidden={!option.secondaryText}>
            {option.secondaryText}
          </div>
        </div>
      </div>
    </div>
  )
}
