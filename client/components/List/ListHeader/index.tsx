/* eslint-disable react-hooks/exhaustive-deps */
import {
  CommandBar,
  format,
  ICommandBarItemProps,
  ICommandBarProps,
  merge,
  SearchBox,
  Sticky,
  StickyPositionType
} from '@fluentui/react'
import React, { FC, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { cleanArray as clean } from 'utils'
import { exportExcel } from 'utils/exportExcel'
import { useListContext } from '../context'
import { CLEAR_FILTERS, EXECUTE_SEARCH, TOGGLE_FILTER_PANEL } from '../reducer'
import { IListHeaderProps } from './types'

export const ListHeader: FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const { t } = useTranslation()
  const context = useListContext()
  const mergedHeaderProps = merge(headerProps, context.props.columnHeaderProps)
  const root = useRef(null)
  const timeout = useRef(null)

  if (!!context.props.columnHeaderProps?.onRender) {
    return context.props.columnHeaderProps.onRender(
      mergedHeaderProps,
      defaultRender
    )
  }

  const searchBoxItem: ICommandBarItemProps = context.props.searchBox && {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...context.props.searchBox}
        styles={{
          root: {
            width: isMobile
              ? root?.current?.clientWidth
              : context.props.defaultSearchBoxWidth
          },
          ...context.props.searchBox.styles
        }}
        defaultValue={context.state.searchTerm}
        onChange={(_event, searchTerm) => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            if (context.props.searchBox.onChange)
              context.props.searchBox.onChange(_event, searchTerm)
            context.dispatch(EXECUTE_SEARCH({ searchTerm }))
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
    items: clean([searchBoxItem, ...context.props.commandBar?.items]),
    farItems: clean([
      ...(context.props.commandBar?.farItems ?? []),
      hasFilterableColumns && toggleFilterPanelItem,
      hasFilterableColumns && clearFiltersItem,
      context.props.exportFileName && excelExportItem
    ])
  }

  headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    const onRenderColumnHeader = props?.column?.data?.onRenderColumnHeader
    if (!onRenderColumnHeader) return defaultRender(props)
    return onRenderColumnHeader(props)
  }

  return (
    <Sticky
      ref={root}
      stickyPosition={StickyPositionType.Header}
      isScrollSynced={true}
    >
      <CommandBar
        hidden={
          _.isEmpty(commandBarProps.items) &&
          _.isEmpty(commandBarProps.farItems)
        }
        {...commandBarProps}
        styles={{ root: { margin: 0, padding: 0 } }}
      />
      {defaultRender(mergedHeaderProps)}
    </Sticky>
  )
}
