/* eslint-disable tsdoc/syntax */
import React, { useState, useEffect } from 'react'
import styles from './SelectCallout.module.scss'
import { SearchBox, Checkbox, Callout, Icon } from 'office-ui-fabric-react'
import { LabelObject } from 'types'
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
      _labels = _labels.filter(
        (lbl) => lbl.name.toLowerCase().includes(value.toLowerCase())
      )
    }
    setLabels(_labels)
  }

  return (
    <Callout
      hidden={props.hidden}
      className={styles.root}
      isBeakVisible={false}
      gapSpace={10}
      onDismiss={props.onDismiss}
      target={props.target}>
      <SearchBox
        className={styles.searchBox}
        placeholder={props.placeholder}
        onChange={(_event, value) => onSearch(value)}
      />
      <ul>
        {labels.map((lbl) => (
          <li key={lbl.name}>
            <div className={styles.itemContainer}>
              <Checkbox
                defaultChecked={
                  props.defaultSelectedKeys.includes(lbl.name)
                }
                className={styles.itemCheckbox}
                onChange={() => props.onToggleLabel(lbl)}
              />
              <div>
                <div>
                  <Icon
                    iconName='CircleFill'
                    style={{ color: lbl.color, fontSize: 10 }}
                  />
                  <span style={{ paddingLeft: 5 }}>{lbl.name}</span>
                </div>
                <div>{lbl.description}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Callout>
  )
}
