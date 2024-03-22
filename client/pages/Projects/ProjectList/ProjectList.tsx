import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../context'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'
import { ListMenuItem } from 'components/List/ListToolbar'

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 *
 * @category Projects
 */
export const ProjectList: TabComponent<IProjectListProps> = (props) => {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const { columns, showInactive, getKey } = useProjectList(props)
  return (
    <>
      <List
        {...props}
        enableShimmer={context.loading}
        items={context.state?.projects ?? []}
        columns={columns}
        groups={props.groups}
        getKey={getKey}
        menuItems={(_context) => [
          (context.state?.projects ?? []).some((c) => c.inactive) &&
            InactiveCheckboxMenuItem(
              t('projects.toggleInactive', {
                count: _context.state.itemsPreFilter.filter((c) => c.inactive)
                  .length
              }),
              showInactive.toggle
            ),
          ...(props.menuItems as ListMenuItem[])
        ]}
        filterValues={
          showInactive.value
            ? {}
            : {
                inactive: false
              }
        }
      />
      {props.children}
    </>
  )
}

ProjectList.defaultProps = {
  items: [],
  menuItems: []
}
