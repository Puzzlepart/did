/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  ShimmeredDetailsList
} from 'office-ui-fabric-react'
import React, { FunctionComponent, useEffect, useMemo, useReducer } from 'react'
import FadeIn from 'react-fade-in'
import { filter, first } from 'underscore'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { generateListGroups } from './generateListGroups'
import styles from './List.module.scss'
import { ListGroupHeader } from './ListGroupHeader'
import { onRenderListHeader } from './onRenderListHeader'
import reducer from './reducer'
import { IListProps } from './types'

/**
 * List component using `ShimmeredDetailsList` from `office-ui-fabric-react`.
 * 
 * Used by:
 * 
 * * EventList
 * * Admin/ApiTokens
 * * Admin/Roles
 * * Admin/SummaryView
 * * Admin/Users/AddMultiplePanel
 * * Admin/Users
 * * Customers/CustomerList
 * * Projects/ProjectList
 * * Reports
 * * Timesheet/SummaryView
 * 
 * @category Function Component
 */
export const List: FunctionComponent<IListProps> = (props: IListProps) => {
  const [state, dispatch] = useReducer(reducer, {
    origItems: props.items || [],
    items: props.items || [],
    searchTerm: null
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch({ type: 'PROPS_UPDATED', payload: props }), [
    props.items
  ])

  const selection = useMemo(() => {
    if (!props.selection) return null
    return new Selection({
      onSelectionChanged: () => {
        const _selection = selection.getSelection()
        switch (props.selection?.mode) {
          case SelectionMode.single:
            props.selection.onChanged(first(_selection))
            break
          case SelectionMode.multiple:
            props.selection.onChanged(_selection)
            break
        }
      }
    })
  }, [props.selection])

  let groups = null
  let items = [...state.items]
  if (props.groups) [groups, items] = generateListGroups(items, props.groups)

  const [delay, transitionDuration] = props.fadeIn || [0, 0]

  return (
    <div className={styles.root} hidden={props.hidden}>
      <FadeIn delay={delay} transitionDuration={transitionDuration}>
        <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
          <ShimmeredDetailsList
            getKey={(_item, index) => `list_item_${index}`}
            setKey={'list'}
            enableShimmer={props.enableShimmer}
            isPlaceholderData={props.enableShimmer}
            selection={selection}
            columns={filter(props.columns, (col) => !col.data?.hidden)}
            items={items}
            groups={groups}
            selectionMode={
              props.selection ? props.selection.mode : SelectionMode.none
            }
            constrainMode={ConstrainMode.horizontalConstrained}
            layoutMode={DetailsListLayoutMode.justified}
            groupProps={{
              ...props.groupProps,
              onRenderHeader: ListGroupHeader
            }}
            onRenderItemColumn={(item, index, column) => {
              if (!!column.onRender) return column.onRender(item, index, column)
              return getValue(item, column.fieldName)
            }}
            onRenderDetailsHeader={(headerProps, defaultRender) =>
              onRenderListHeader({
                headerProps,
                defaultRender,
                props,
                state,
                dispatch
              })
            }
            checkboxVisibility={
              props.checkboxVisibility || CheckboxVisibility.hidden
            }
          />
        </ScrollablePaneWrapper>
      </FadeIn>
    </div>
  )
}
