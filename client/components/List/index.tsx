import { getValue } from 'helpers'
import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode, 
  GroupHeader,
  IColumn,
  IDetailsGroupDividerProps,
  Selection,
  SelectionMode, ShimmeredDetailsList
} from 'office-ui-fabric'
import React, { useEffect, useReducer } from 'react'
import FadeIn from 'react-fade-in'
import { filter, first } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import { ScrollablePaneWrapper } from '../ScrollablePaneWrapper'
import { generateListGroups } from './generateListGroups'
import styles from './List.module.scss'
import { onRenderListHeader } from './onRenderListHeader'
import reducer from './reducer'
import { IListProps } from './types'

const List = (props: IListProps) => {
  const [state, dispatch] = useReducer(reducer, {
    origItems: props.items || [],
    items: props.items || [],
    searchTerm: null
  })
  let selection = null

  useEffect(() => dispatch({ type: 'PROPS_UPDATED', payload: props }), [props.items])

  selection =
    props.selection &&
    new Selection({
      onSelectionChanged: () => {
        const _selection = selection.getSelection()
        // eslint-disable-next-line default-case
        switch (props.selection?.mode) {
          case SelectionMode.single: props.selection.onChanged(first(_selection))
            break
          case SelectionMode.multiple: props.selection.onChanged(_selection)
            break
        }
      }
    })

  const onRenderGroupHeader = (headerProps: IDetailsGroupDividerProps) => {
    return (
      <GroupHeader
        {...headerProps}
        styles={{
          title: { cursor: 'initial' },
          expand: { cursor: 'pointer' },
          headerCount: { display: 'none' }
        }}></GroupHeader>
    )
  }

  let groups = null
  let items = [...state.items]
  if (props.groups) [groups, items] = generateListGroups(items, props.groups)

  const [delay, transitionDuration] = props.fadeIn

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
            selectionMode={props.selection ? props.selection.mode : SelectionMode.none}
            constrainMode={ConstrainMode.horizontalConstrained}
            layoutMode={DetailsListLayoutMode.justified}
            groupProps={{
              ...props.groupProps,
              onRenderHeader: onRenderGroupHeader
            }}
            onRenderItemColumn={(item, index, column) => {
              if (!!column.onRender) return column.onRender(item, index, column)
              return getValue(item, column.fieldName)
            }}
            onRenderDetailsHeader={(headerProps, defaultRender) => onRenderListHeader({
              headerProps,
              defaultRender,
              props,
              state,
              dispatch
            })}
            checkboxVisibility={props.checkboxVisibility || CheckboxVisibility.hidden}
          />
        </ScrollablePaneWrapper>
      </FadeIn>
    </div>
  )
}

export default withDefaultProps(List, {
  fadeIn: [0, 0],
  items: [],
  commandBar: {
    items: [],
    farItems: []
  }
} as IListProps)

export { SelectionMode, IColumn }
