import { List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useProjectsContext } from '../context'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'
import { CheckboxVisibility, SelectionMode } from 'components/List/types'
import { SET_SELECTED_PROJECTS } from '../reducer'
import { Project } from 'types'

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 *
 * @category Projects
 */
export const ProjectList: TabComponent<IProjectListProps> = (props) => {
  const context = useProjectsContext()
  const { items, columns, menuItems, showInactive } = useProjectList(props)
  return (
    <>
      <List
        {...props}
        enableShimmer={context.loading}
        items={items}
        columns={columns}
        groups={props.groups}
        menuItems={menuItems}
        filterValues={
          showInactive.value
            ? {}
            : {
                '!inactive': true
              }
        }
        checkboxVisibility={CheckboxVisibility.onHover}
        selectionProps={[
          SelectionMode.multiple,
          (selected) =>
            context.dispatch(SET_SELECTED_PROJECTS(selected as Project[]))
        ]}
      />
      {props.children}
    </>
  )
}

ProjectList.defaultProps = {
  menuItems: []
}
