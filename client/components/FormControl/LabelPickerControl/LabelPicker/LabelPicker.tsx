import { Checkbox } from '@fluentui/react-components'
import { DynamicSearchBox } from 'components'
import { SubText } from 'components/SubText'
import { getFluentIcon } from 'utils/getFluentIcon'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import styles from './LabelPicker.module.scss'
import { ILabelPickerProps } from './types'
import { useLabelPicker } from './useLabelPicker'

/**
 * @category Function Component
 */
export const LabelPicker: StyledComponent<ILabelPickerProps> = (props) => {
  const { labels, onSearch } = useLabelPicker(props)

  return (
    <div className={LabelPicker.className}>
      <div className={styles.scrollableContent}>
        <div className={styles.stickyHeader}>
          <DynamicSearchBox
            className={styles.searchBox}
            placeholder={props.placeholder}
            onChange={onSearch}
          />
        </div>
        <div className={styles.container}>
          <ul>
            {labels.map((label) => (
              <li key={label.name}>
                <div className={styles.itemContainer}>
                  <Checkbox
                    checked={_.any(
                      props.selectedLabels,
                      ({ name }) => name === label.name
                    )}
                    className={styles.itemCheckbox}
                    // v9 Checkbox supports complex ReactNode content in label prop
                    label={
                      <div style={{ marginLeft: 8 }}>
                        <div>
                          {getFluentIcon('CircleFill', {
                            color: label.color,
                            size: 10
                          })}
                          <span style={{ paddingLeft: 5 }}>{label.name}</span>
                        </div>
                        <SubText text={s.prune(label.description, 80)} />
                      </div>
                    }
                    onChange={() => {
                      props.onToggleLabel(label)
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

LabelPicker.displayName = 'LabelPicker'
LabelPicker.className = styles.labelPicker
