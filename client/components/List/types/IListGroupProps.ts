/**
 * @category List
 */

export interface IListGroupProps {
  fieldName: string
  groupNames?: string[]
  groupData?: any[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
