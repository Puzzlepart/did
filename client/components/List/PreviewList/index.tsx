import { DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Label } from '@fluentui/react-components'
import React, { FC } from 'react'
import { IListProps } from '../types'
import { usePreviewList } from './usePreviewList'
import { Toolbar } from '../Toolbar'

/**
 * The PreviewList component displays items in a `DataGrid` component
 * from `@fluentui/react-components`.
 */
export const PreviewList: FC<IListProps<any>> = (props) => {
    const { dataGridProps } = usePreviewList(props)
    const root = React.useRef(null)
    return (
        <div ref={root}>
            <Toolbar root={root} />
            <DataGrid {...dataGridProps} >
                <DataGridHeader>
                    <DataGridRow>
                        {({ renderHeaderCell }) => (
                            <DataGridHeaderCell>
                                <Label weight='semibold'>
                                    {renderHeaderCell()}
                                </Label>
                            </DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody>
                    {({ item, rowId }) => (
                        <DataGridRow key={rowId} >
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