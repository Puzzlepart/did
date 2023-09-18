import { useToggle } from 'hooks'
import { useEffect, useMemo, useState } from 'react'
import { Project } from 'types'
import { useProjectsContext } from '../context'
import { IProjectListProps } from './types'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ProjecList />`
 *
 * @param props Props for the component
 *
 * @category Projects
 */
export function useProjectList(props: IProjectListProps) {
  const context = useProjectsContext()
  const initialItems = useMemo(() => {
    let items = context?.state?.projects ?? props.items
    if (props.id === 'm') {
      items = items.filter(({ outlookCategory }) => !!outlookCategory)
    }
    return items
  }, [context?.state?.projects, props.items, props.id])
  const [items, setItems] = useState(initialItems)
  const [showInactive, toggleInactive] = useToggle(false)
  const [selectedProject, onSelectionChanged] = useState<Project>(null)
  const columns = useColumns(props)

  useEffect(
    () =>
      setItems(
        [...initialItems].filter(({ inactive }) => showInactive || !inactive)
      ),
    [initialItems, props.id, showInactive]
  )

  return {
    items,
    columns,
    toggleInactive,
    selectedProject,
    onSelectionChanged
  }
}
