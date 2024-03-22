/* eslint-disable unicorn/consistent-function-scoping */
import { Project } from 'types'
import { useBoolean } from 'usehooks-ts'
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
  const showInactive = useBoolean(false)
  const columns = useColumns(props)

  function getKey(project: Project, index: number) {
    return `project_list_item_${project?.tag ?? index}`
  }

  return {
    columns,
    showInactive,
    getKey
  }
}
