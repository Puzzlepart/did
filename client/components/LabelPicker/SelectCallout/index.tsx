/* eslint-disable tsdoc/syntax */
import { Callout, Checkbox, Icon, ScrollablePane, SearchBox, Sticky, StickyPositionType } from '@fluentui/react'
import { SubText } from 'components/SubText'
import React, { useEffect, useState } from 'react'
import { LabelObject } from 'types'
import { any } from 'underscore'
import { truncateString } from 'utils/truncateString'
import styles from './SelectCallout.module.scss'
import { ISelectCalloutProps } from './types'

/**
 * @category Function Component
 */
export const SelectCallout = (props: ISelectCalloutProps) => {
  const [labels, setLabels] = useState<LabelObject[]>(props.labels)

  useEffect(() => setLabels(props.labels), [props.labels])

  function onSearch(value: string) {
    let _labels = [...props.labels]
    if (value.length > 0) {
      _labels = _labels.filter((lbl) =>
        lbl.name.toLowerCase().includes(value.toLowerCase())
      )
    }
    setLabels(_labels)
  }

  return (
    <Callout
      hidden={props.hidden}
      isBeakVisible={false}
      gapSpace={10}
      onDismiss={props.onDismiss}
      target={props.target}>
      <div className={styles.root}>
        <ScrollablePane>
          <Sticky stickyPosition={StickyPositionType.Header}>
            <div className={styles.header} hidden={!props.headerText}>
              {props.headerText}
            </div>
            <SearchBox
              className={styles.searchBox}
              placeholder={props.placeholder}
              styles={{ field: { padding: '4px 6px' } }}
              onChange={(_event, value) => onSearch(value)}
            />
          </Sticky>
          <ul>
            {labels.map((label) => (
              <li key={label.name}>
                <div className={styles.itemContainer}>
                  <Checkbox
                    checked={any(props.selectedLabels, ({ name }) => name === label.name)}
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
                        <SubText text={truncateString(label.description, 80)} />
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
        </ScrollablePane>
      </div>
    </Callout>
  )
}
