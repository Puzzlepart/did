/* eslint-disable tsdoc/syntax */
import { useEffect, useState } from 'react'
import { IProjectListProps } from './types'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ProjecList />`
 *
 * @category Projects
 */
export function useProjectList(props: IProjectListProps) {
  const [items, setItems] = useState([...(props.items || [])])
  const [showInactive, setShowInactive] = useState(false)
  const columns = useColumns(props)

  useEffect(
    () =>
      setItems(
        [...props.items].filter((p) => (showInactive ? true : !p.inactive))
      ),
    [props.items, showInactive]
  )

  return {
    items,
    columns,
    showInactive,
    setShowInactive
  }
}
