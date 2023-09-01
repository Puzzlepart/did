import { List, TabComponent } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import React from 'react'
import { useProjectsContext } from '../context'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 *
 * @category Projects
 */
export const ProjectList: TabComponent<IProjectListProps> = (props) => {
  const { listProps } = useProjectsContext()
  const { items, columns } = useProjectList(props)
  return (
    <>
      <List
        {...listProps}
        items={items}
        columns={columns}
        groups={props.groups}
        selectionProps={props.selectionProps}
        menuItems={[new ListMenuItem().setDisabled(true)]}
      />
      {props.children}
    </>
  )
}

ProjectList.defaultProps = {
  items: []
}

export * from './types'
