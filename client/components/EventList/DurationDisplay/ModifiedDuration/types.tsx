import { IIconProps } from '@fluentui/react'
import { EventObject, TimeEntry } from 'types'

export interface IModifiedDurationProps {
  event: TimeEntry | EventObject
  iconProps?: IIconProps
}
