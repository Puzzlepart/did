import React from 'react'

export interface IColorPickerFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  color: string
  onChanged: (color: string) => void
}
