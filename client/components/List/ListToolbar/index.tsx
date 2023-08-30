import {
  CommandBar,
  format,
  ICommandBarItemProps,
  ICommandBarProps,
  Icon
} from '@fluentui/react'
import { Toolbar, ToolbarButton } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import React, { FC, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import { useListContext } from '../context'
import { CLEAR_FILTERS, EXECUTE_SEARCH, TOGGLE_FILTER_PANEL } from '../reducer'

export const ListToolbar: FC<{ root: React.MutableRefObject<any> }> = ({
  root
}) => {
  const { t } = useTranslation()
  const context = useListContext()

  const timeout = useRef(null)

  const searchBoxItem: ICommandBarItemProps = context.props.searchBox && {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...context.props.searchBox}
        style={{
          width: isMobile
            ? root?.current?.clientWidth
            : context.props.defaultSearchBoxWidth
        }}
        defaultValue={context.state.searchTerm}
        onChange={(_event, data) => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            if (context.props.searchBox.onChange)
              context.props.searchBox.onChange(_event, data)
            context.dispatch(EXECUTE_SEARCH({ searchTerm: data?.value }))
          }, 250)
        }}
      />
    )
  }

  const toggleFilterPanelItem: ICommandBarItemProps = {
    key: 'TOGGLE_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    disabled: context.props.enableShimmer,
    onClick: () => context.dispatch(TOGGLE_FILTER_PANEL())
  }

  const clearFiltersItem: ICommandBarItemProps = {
    key: 'CLEAR_FILTERS',
    iconProps: { iconName: 'ClearFilter' },
    iconOnly: true,
    disabled: context.state.origItems.length === context.state.items.length,
    onClick: () => context.dispatch(CLEAR_FILTERS())
  }

  const excelExportItem: ICommandBarItemProps = {
    key: 'EXPORT_TO_EXCEL',
    text: t('reports.exportToExcel'),
    onClick: () => {
      const fileName = format(
        context.props.exportFileName,
        new Date().toDateString().split(' ').join('-')
      )
      exportExcel(context.state.items, {
        columns: context.props.columns,
        fileName
      })
    },
    disabled: context.props.enableShimmer,
    iconProps: {
      iconName: 'ExcelDocument',
      styles: { root: { color: 'green' } }
    }
  }

  const hasFilterableColumns = _.any(
    context.props.columns,
    (col) => col?.data?.isFilterable
  )

  const commandBarProps: ICommandBarProps = {
    ...context.props.commandBar,
    items: [searchBoxItem, ...context.props.commandBar?.items].filter(Boolean),
    farItems: [
      ...(context.props.commandBar?.farItems ?? []),
      hasFilterableColumns && toggleFilterPanelItem,
      hasFilterableColumns && clearFiltersItem,
      context.props.exportFileName && excelExportItem
    ].filter(Boolean)
  }

  if (context.props.usePreview) {
    const items = [...commandBarProps.items, ...commandBarProps.farItems]
    return (
      <Toolbar>
        {items.map((item, index) => (
          <ToolbarButton
            key={index}
            icon={<Icon {...item.iconProps} />}
            onClick={item.onClick}
          >
            {item.text}
          </ToolbarButton>
        ))}
      </Toolbar>
    )
  }
  return (
    <CommandBar
      hidden={
        _.isEmpty(commandBarProps.items) && _.isEmpty(commandBarProps.farItems)
      }
      {...commandBarProps}
      styles={{ root: { margin: 0, padding: 0 } }}
    />
  )
}
