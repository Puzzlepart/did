/* eslint-disable unicorn/prevent-abbreviations */
import { IBreadcrumbItem } from 'components/Breadcrumb/types'
import { useAppContext } from 'AppContext'
import { IMobileBreadcrumbProps } from '.'

/**
 * Returns the items that should be rendered by
 * `<MobileBreadcrumb />`
 */
export function useMobileBreadcrumb(
  props: IMobileBreadcrumbProps
): IBreadcrumbItem[] {
  const { state } = useAppContext()
  const nav = Object.keys(state.nav || {})
  const pageText = props.page.text ?? props.page.displayName ?? ''
  const navItems = nav
    .map((key) => state.nav?.[key])
    .filter(Boolean)
    .map((item, index) => ({
      key: index + 1,
      value: item?.text ?? '',
      onClick: item?.onClick
    }))

  return [
    {
      key: 0,
      value: pageText
    },
    ...navItems
  ]
}
