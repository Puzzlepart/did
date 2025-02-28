import { PopoverProps } from '@fluentui/react-components'
import { IMissingSubmissionUserProps } from '../types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMissingSubmissionUserPopoverProps
  extends IMissingSubmissionUserProps {
  openOnHover?: PopoverProps['openOnHover']
}
