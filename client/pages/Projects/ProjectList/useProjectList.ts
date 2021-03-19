/* eslint-disable tsdoc/syntax */
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Component logic hook for `<ProjecList />`
 *
 * @category Projects
 */
export function useProjectList({ props }) {
  const { t } = useTranslation()
  const [items, setItems] = useState([...(props.items || [])])
  const [showInactive, setShowInactive] = useState(false)

  useEffect(
    () =>
      setItems(
        [...props.items].filter((p) => (showInactive ? true : !p.inactive))
      ),
    [props.items, showInactive]
  )

  return {
    items,
    showInactive,
    setShowInactive,
    t
  }
}
