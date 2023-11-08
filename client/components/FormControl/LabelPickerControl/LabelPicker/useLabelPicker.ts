import { useMemo, useState } from 'react'
import { ILabelPickerProps } from './types'

export function useLabelPicker(props: ILabelPickerProps) {
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

  return { labels, onSearch }
}
