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
  const { items, columns, toggleInactive } = useProjectList(props)
  return (
    <>
      <List
        {...(context?.listProps ?? {})}
        {...props}
        items={items}
        columns={columns}
        groups={props.groups}
        selectionProps={props.selectionProps}
        menuItems={[
          InactiveCheckboxMenuItem(t('projects.toggleInactive'), toggleInactive)
        ]}
      />
      {props.children}
    </>
  )
}

ProjectList.defaultProps = {
  items: []
}

export * from './types'
