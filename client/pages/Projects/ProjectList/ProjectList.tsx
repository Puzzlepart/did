import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
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
  const {
    items,
    columns,
    toggleInactive
  } = useProjectList(props)
  return (
    <>
      <List
        {...props}
        enableShimmer={context.loading}
        items={items}
        columns={columns}
        groups={props.groups}
        menuItems={[
          InactiveCheckboxMenuItem(
            t('projects.toggleInactive'),
            toggleInactive,
            !_.some(items, (item) => item.inactive)
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
