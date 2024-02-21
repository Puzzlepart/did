/* eslint-disable unicorn/consistent-function-scoping */
import { useEffect, useMemo, useState } from 'react'
import { Project } from 'types'
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
  const context = useProjectsContext()
  const initialProjects = useMemo(() => {
    let projects = context?.state?.projects ?? props.items
    if (props.id === 'm') {
      projects = projects.filter(({ outlookCategory }) => !!outlookCategory)
    }
    return projects
  }, [context?.state?.projects, props.items, props.id])
  const [projects, setProjects] = useState(initialProjects)
  const showInactive = useBoolean(false)
  const columns = useColumns(props)

  useEffect(
    () =>
      setProjects(
        [...initialProjects].filter(
          ({ inactive }) => showInactive.value || !inactive
        )
      ),
    [initialProjects, props.id, showInactive.value]
  )

  const inactiveProjects = initialProjects.filter(({ inactive }) => inactive)

  function getKey(project: Project, index: number) {
    return `project_list_item_${project?.tag ?? index}`
  }

  return {
    projects,
    inactiveProjects,
    columns,
    showInactive,
    getKey
  }
}
