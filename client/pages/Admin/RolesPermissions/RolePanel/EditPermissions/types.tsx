import { IFieldProps } from 'components'
import { HTMLAttributes } from 'react'
import { FluentIconName } from 'utils'

/**
 * Props for the EditPermissions component.
 */
export interface IEditPermissionsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    Pick<IFieldProps, 'name' | 'label' | 'description'> {
  /**
   * Label format for the permissions list. For instance
   * `{{count}} {{label}} selected`.
   */
  labelFormat?: string
  /**
   * Label for the button that opens the permissions menu.
   */
  buttonLabel?: string

  /**
   * Icon for the button that opens the permissions menu.
   */
  buttonIcon?: FluentIconName

  /**
   * Empty message to display when there are no permissions selected.
   */
  emptyMessage?: string

  /**
   * An array of selected permissions.
   */
  selectedPermissions: string[]

  /**
   * A function that is called when the selected permissions change.
   *
   * @param permissions - The updated array of selected permissions.
   */
  onChange: (permissions: string[]) => void

  /**
   * Whether or not to fetch API permissions.
   */
  api?: boolean
}
