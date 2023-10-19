import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const context = useProjectsContext()
  const { projects, inactiveProjects, columns, showInactive } =
    useProjectList(props)
  return (
    <>
      <List
        {...props}
        enableShimmer={context.loading}
        items={projects}
        columns={columns}
        groups={props.groups}
        menuItems={[
          inactiveProjects.length > 0 &&
            InactiveCheckboxMenuItem(
              t('projects.toggleInactive', { count: inactiveProjects.length }),
              showInactive.toggle
            ),
          ...props.menuItems
        ]}
      />
      {props.children}
    </>
  )
}

ProjectList.defaultProps = {
  items: [],
  menuItems: []
}
