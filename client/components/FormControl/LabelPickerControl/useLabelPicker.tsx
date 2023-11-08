import { useLabelsQuery } from 'graphql-queries/labels'
import { useEffect, useState } from 'react'
import { LabelObject } from 'types'
import { omitTypename } from 'utils'
import { ILabelPickerControlProps } from './types'

export function useLabelPicker({
  onChange,
  defaultSelectedKeys
}: ILabelPickerControlProps) {
  const [labels] = useLabelsQuery()
  const [selectedLabels, setSelectedLabels] = useState<LabelObject[]>([])

  function onToggleLabel(label: LabelObject) {
    const _selectedLabels = [...selectedLabels]
    const index = _selectedLabels.findIndex((lbl) => lbl.name === label.name)
    if (index > -1) {
      _selectedLabels.splice(index, 1)
    } else {
      _selectedLabels.push(label)
    }
    setSelectedLabels(_selectedLabels)
    onChange(_selectedLabels)
  }

  useEffect(() => {
    const _labels: LabelObject[] = labels.map((lbl) => omitTypename(lbl))
    if (defaultSelectedKeys) {
      const _selectedLabels = _labels.filter((lbl) =>
        defaultSelectedKeys.includes(lbl.name)
      )
      setSelectedLabels(_selectedLabels)
    }
  }, [labels])

  return {
    onToggleLabel,
    labels,
    selectedLabels
  }
}
