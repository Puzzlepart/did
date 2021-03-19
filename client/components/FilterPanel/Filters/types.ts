/* eslint-disable tsdoc/syntax */

/**
 * @category FilterPanel
 */
export interface IFilterItem {
  key: string | number
  value: string
}

/**
 * @category FilterPanel
 */
export interface IFilter {
  key: string
  name: string
  items: IFilterItem[]
  selected: IFilterItem[]
}
