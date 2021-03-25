import { ISearchBoxProps } from '@fluentui/react'

export interface IIconPickerProps extends ISearchBoxProps {
  label?: string
  description?: string
  defaultSelected?: string
  onSelected: (icon: string) => void
}
