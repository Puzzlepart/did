import { SelectionMode } from '@fluentui/react'
import { DataGridProps } from '@fluentui/react-components'
import { useMemo } from 'react'
import { IListProps } from '../types'
import { createPreviewListColumn } from './createPreviewListColumn'
import { useColumnSizingOptions } from './useColumnSizingOptions'

/**
 * Custom hook that returns the data grid props for a preview list.
 *
 * @param props - The props for the preview list.
 *
 * @returns An object containing the data grid props.
 */
export function usePreviewList(props: IListProps<any>) {
  const columnSizingOptions = useColumnSizingOptions(props.columns)
  const dataGridProps = useMemo<DataGridProps>(() => {
    let selectionMode = null
    switch (props.selectionMode) {
      case SelectionMode.single: {
        {
          selectionMode = 'single'
        }
        break
      }
      case SelectionMode.multiple: {
        selectionMode = 'multiple'
        break
      }
      default: {
        selectionMode = null
      }
    }
    // eslint-disable-next-line no-console
    console.log(props.selectionMode, selectionMode)
    return {
      items: props.items,
      columns: props.columns.map((column) => createPreviewListColumn(column)),
      sortable: true,
      selectionMode,
      focusMode: 'composite',
      columnSizingOptions,
      resizableColumns: true
    } as DataGridProps
  }, [props])
  return { dataGridProps }
}
