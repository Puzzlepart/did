import { HTMLAttributes } from 'react'

/**
 * Props for the EditPermissions component.
 */
export interface IEditPermissionsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The label for the component.
   */
  label: string

  /**
   * The description for the component.
   */
  description: string

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
