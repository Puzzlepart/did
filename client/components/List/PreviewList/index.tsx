import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Label
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { ListToolbar } from '../ListToolbar'
import { IListProps } from '../types'
import { usePreviewList } from './usePreviewList'

/**
 * The PreviewList component displays items in a `DataGrid` component
 * from `@fluentui/react-components`.
 */
export const PreviewList: FC<IListProps<any>> = (props) => {
  const { dataGridProps } = usePreviewList(props)
  const root = React.useRef(null)
  return (
    <div ref={root}>
      <ListToolbar root={root} />
      <DataGrid {...dataGridProps}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>
                <Label weight='semibold'>{renderHeaderCell()}</Label>
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  )
}
