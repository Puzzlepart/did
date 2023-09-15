import {
  Checkbox,
  Icon,
  ScrollablePane,
  Sticky,
  StickyPositionType
} from '@fluentui/react'
import { DynamicSearchBox } from 'components'
import { SubText } from 'components/SubText'
import React, { useMemo, useState } from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import styles from './LabelPicker.module.scss'
import { ILabelPickerProps } from './types'

/**
 * @category Function Component
 */
export const LabelPicker: StyledComponent<ILabelPickerProps> = (props) => {
  const [searchTerm, onSearch] = useState<string>('')

  const labels = useMemo(() => {
    let _labels = [...props.labels]
    if (searchTerm.length > 0) {
      _labels = _labels.filter((lbl) =>
        lbl.name.toLowerCase().includes(searchTerm)
      )
    }
    return _labels
  }, [props.labels, searchTerm])

  return (
    <div className={LabelPicker.className}>
      <ScrollablePane className={styles.scrollableContent}>
        <div className={styles.container}>
          <Sticky stickyPosition={StickyPositionType.Header}>
            <div className={styles.header}>
              <DynamicSearchBox
                className={styles.searchBox}
                placeholder={props.placeholder}
                onChange={onSearch}
              />
            </div>
          </Sticky>
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
                    onRenderLabel={() => (
                      <div style={{ marginLeft: 8 }}>
                        <div>
                          <Icon
                            iconName='CircleFill'
                            style={{ color: label.color, fontSize: 10 }}
                          />
                          <span style={{ paddingLeft: 5 }}>{label.name}</span>
                        </div>
                        <SubText text={s.prune(label.description, 80)} />
                      </div>
                    )}
                    onChange={() => {
                      props.onToggleLabel(label)
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollablePane>
    </div>
  )
}

LabelPicker.displayName = 'LabelPicker'
LabelPicker.className = styles.labelPicker
