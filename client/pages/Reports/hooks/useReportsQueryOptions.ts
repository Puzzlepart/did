import { IChoiceGroupOption } from '@fluentui/react'
import { CHANGE_QUERY } from '../reducer/actions'

/**
 * Returns queries from `useReportsQueries` as choice group options
 * to be used in `<ChoiceGroup />` component.
 *
 * @category Reports
 */
export function useReportsQueryOptions({
  queries,
  dispatch
}): IChoiceGroupOption[] {
  return queries.map(
    ({ itemKey, headerText, itemIcon }) =>
      ({
        key: itemKey,
        text: headerText,
        iconProps: { iconName: itemIcon },
        onClick: () => dispatch(CHANGE_QUERY({ itemKey })),
        styles: {
          root: {
            padding: 25,
            maxWidth: 180
          },
          labelWrapper: {
            maxWidth: 'none'
          },
          field: {
            border: 'none',
            ':before': {
              display: 'none'
            }
          }
        }
      } as IChoiceGroupOption)
  )
}
