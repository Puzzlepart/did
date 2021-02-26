import { useQuery } from '@apollo/client'
import { EntityLabel } from 'components/EntityLabel'
import { Icon, Label } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import { omit } from 'underscore'
import styles from './LabelPicker.module.scss'
import $labels from './labels.gql'
import { SelectCallout } from './SelectCallout'
import { ILabelPickerProps } from './types'

export const LabelPicker: FunctionComponent<ILabelPickerProps> = (props: ILabelPickerProps) => {
  const { t } = useTranslation()
  const { data } = useQuery($labels, { fetchPolicy: 'cache-and-network' })
  const toggleRef = useRef()
  const [labels, setLabels] = useState<LabelObject[]>([])
  const [selectedLabels, setSelectedLabels] = useState<LabelObject[]>([])
  const [showCallout, setShowCallout] = useState<boolean>(false)

  function onToggleLabel(label: LabelObject) {
    const _selectedLabels = [...selectedLabels]
    const index = _selectedLabels.indexOf(label)
    if (index === -1) {
      _selectedLabels.push(label)
      setSelectedLabels(_selectedLabels)
    } else {
      _selectedLabels.splice(index, 1)
      setSelectedLabels(_selectedLabels)
    }
    props.onChange(_selectedLabels)
  }

  useEffect(() => {
    if (data?.labels) {
      const _labels: LabelObject[] = data.labels.map((lbl: any) => omit(lbl, '__typename'))
      setLabels(_labels)
      if (props.defaultSelectedKeys) {
        const _selectedLabels = _labels.filter(
          (lbl) => props.defaultSelectedKeys.indexOf(lbl.name) !== -1
        )
        setSelectedLabels(_selectedLabels)
      }
    }
  }, [data, props.defaultSelectedKeys])

  return (
    <div className={`${styles.root} ${props.className}`}>
      <Label className={styles.label}>
        <span>{props.label}</span>
        <span
          className={styles.toggleIcon}
          onClick={() => setShowCallout(!showCallout)}
          ref={toggleRef}>
          <Icon iconName='Settings' />
        </span>
      </Label>
      {selectedLabels.map((lbl) => (
        <EntityLabel key={lbl.name} label={lbl} />
      ))}
      <span className={styles.noneSelected} hidden={selectedLabels.length > 0}>
        {t('common.noneSelectedMessage')}
      </span>
      <SelectCallout
        target={toggleRef}
        hidden={!showCallout}
        labels={labels}
        placeholder={props.placeholder}
        onToggleLabel={onToggleLabel}
        defaultSelectedKeys={props.defaultSelectedKeys}
        onDismiss={() => setShowCallout(false)}
      />
    </div>
  )
}
