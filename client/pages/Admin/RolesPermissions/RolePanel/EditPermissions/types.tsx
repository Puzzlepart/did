/**
 * Props for the EditPermissions component.
 */
export interface IEditPermissionsProps {
  /**
   * The label for the component.
   */
  label: string

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
}
