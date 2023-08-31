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
import styles from './PreviewList.module.scss'

/**
 * The PreviewList component displays items in a `DataGrid` component
 * from `@fluentui/react-components`.
 */
export const PreviewList: FC<IListProps<any>> = (props) => {
  const { dataGridProps } = usePreviewList(props)
  const root = React.useRef(null)
  return (
    <div ref={root} className={styles.root}>
      <ListToolbar root={root} />
      <DataGrid {...dataGridProps} className={styles.dataGrid}>
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
