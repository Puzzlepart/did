import { Icon } from '@fluentui/react'
import React, { ReactElement } from 'react'
import styles from './AutocompleteControl.module.scss'
import { ISuggestionItem } from './types'

/**
 * Renders an option for the `AutocompleteControl` component.
 *
 * @param option The option to render.
 * @param hideText Whether to hide the text and secondary text.
 */
export const renderOption = (option: ISuggestionItem<any>, hideText: boolean): ReactElement => (
  <div className={styles.option}>
    <div className={styles.container}>
      <div className={styles.icon} hidden={!option.iconName}>
        <Icon iconName={option.iconName} styles={{ root: { fontSize: 22 } }} />
      </div>
      <div className={styles.content} hidden={hideText}>
        <div className={styles.text}>{option.text}</div>
        <div className={styles.secondaryText} hidden={!option.secondaryText}>
          {option.secondaryText}
        </div>
      </div>
    </div>
  </div>
)
