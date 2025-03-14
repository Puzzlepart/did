/* eslint-disable unicorn/consistent-function-scoping */
import { InactiveCheckboxMenuItem } from 'components'
import { IListProps, ListMenuItem } from 'components/List'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { useProjectsContext } from '../context'
import { IProjectListProps } from './types'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ProjecList />`. This hook is used to
 * manage the state and actions of the `<ProjectList />` component.
 * It handles the filtering of projects based on the `showInactive`
 * and tab `id` props. It also handles the columns for the table,
 * using the `useColumns` hook.
 *
 * @param props Props for the component
 *
 * @category Projects
 */
export function useProjectList(props: IProjectListProps) {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const showInactive = useBoolean(false)
  const columns = useColumns(props)

  const items = useMemo(() => {
    let projects = context?.state?.projects ?? []
    if (props.id === 'm') {
      projects = projects.filter(
        ({ outlookCategory, tag }) =>
          Boolean(outlookCategory) || context?.state?.myProjects?.includes(tag)
      )
    }
    return projects
  }, [context?.state?.projects, props.id])

  const menuItems: IListProps['menuItems'] = ({ state }) => [
    items.some((c) => c.inactive) &&
      InactiveCheckboxMenuItem(
        t('projects.toggleInactive', {
          count: state.itemsPreFilter.filter((c) => c.inactive).length
        }),
        showInactive.toggle
      ),
    ...(props.menuItems as ListMenuItem[])
  ]

  return {
    items,
    columns,
    menuItems,
    showInactive
  }
}
