import { HTMLAttributes } from 'react'
import { IUserPickerProps } from './UserPicker'

export interface IUserPickerControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, IUserPickerProps { }