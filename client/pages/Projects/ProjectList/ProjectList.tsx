import { SelectionMode } from '@fluentui/react'
import { InactiveCheckboxMenuItem, List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import _ from 'underscore'
import { useProjectsContext } from '../context'
import { OPEN_EDIT_PANEL } from '../reducer'
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
    toggleInactive,
    selectedProject,
    onSelectionChanged
  } = useProjectList(props)
  const [, hasPermission] = usePermissions()
  return (
    <>
      <List
        {...props}
        enableShimmer={context.loading}
        items={items}
        columns={columns}
        groups={props.groups}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          InactiveCheckboxMenuItem(
            t('projects.toggleInactive'),
            toggleInactive,
            !_.some(items, (item) => item.inactive)
          ),
          ...props.menuItems,
          new ListMenuItem(t('projects.editButtonLabel'))
            .withIcon('TableEdit')
            .setDisabled(!hasPermission($.MANAGE_PROJECTS) || !selectedProject)
            .setOnClick(() =>
              context.dispatch(OPEN_EDIT_PANEL(selectedProject))
            )
            .setGroup('actions')
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
