import { HTMLAttributes } from 'react'

export interface IColorPickerFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  color: string
  onChanged: (color: string) => void
}
