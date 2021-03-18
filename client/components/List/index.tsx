/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  SelectionMode,
  ShimmeredDetailsList
} from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import FadeIn from 'react-fade-in'
import { filter } from 'underscore'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import styles from './List.module.scss'
import { ListGroupHeader } from './ListGroupHeader'
import { onRenderListHeader } from './onRenderListHeader'
import { IListProps } from './types'
import { useList } from './useList'

/**
 * List component using `ShimmeredDetailsList` from `office-ui-fabric-react`.
 *
 * Used by:
 *
 * * `<EventList />`
 * * `<Admin />` => `<ApiTokens />`
 * * `<Admin />` => `<Roles />`
 * * `<Admin />` => `<SummaryView />`
 * * `<Admin />` => `<Users />` => `<AddMultiplePanel />`
 * * `<Admin />` => `<Users />`
 * * `<Customers />` => `<CustomerList />`
 * * `<Projects />` => `<ProjectList />`
 * * `<Reports />`
 * * `<Timesheet />` => `<SummaryView />`
 *
 * @category Function Component
 */
export const List: FunctionComponent<IListProps> = (props: IListProps) => {
  const {
    state,
    dispatch,
    selection,
    groups,
    delay,
    transitionDuration
  } = useList({ props })
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
            items={state.items}
            groups={groups}
            selectionMode={
              props.selectionProps
                ? props.selectionProps.mode
                : SelectionMode.none
            }
            constrainMode={ConstrainMode.horizontalConstrained}
            layoutMode={DetailsListLayoutMode.justified}
            groupProps={{
              ...props.listGroupRenderProps,
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
