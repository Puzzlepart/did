import { ISearchBoxProps } from 'office-ui-fabric-react'

export interface IIconPickerProps extends ISearchBoxProps {
  label?: string
  description?: string
  defaultSelected?: string
  onSelected: (icon: string) => void
}
