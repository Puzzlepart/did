/**
 * @category List
 */

export interface IListGroupProps<T = any> {
  /**
   * The name of the field to group by.
   */
  fieldName: string

  /**
   * The names of the groups.
   */
  groupNames?: string[]

  /**
   * The data of the groups.
   */
  groupData?: any[]

  /**
   * The name of the empty group.
   */
  emptyGroupName?: string

  /**
   * Function to get the total for the group.
   *
   * @param items The items of the group.
   */
  totalFunc?: (items: T[]) => string
}
