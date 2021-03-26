/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
import { IBreadcrumbItem } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { IMobileBreadcrumbProps } from '.'

/**
 * Returns the items that should be rendered by
 * `<MobileBreadcrumb />`
 */
export function useMobileBreadcrumb(props: IMobileBreadcrumbProps): IBreadcrumbItem[] {
  const { state } = useAppContext()
  const nav = Object.keys(state.nav || {})
  const items = [
    {
      key: 'current',
      text: props.page.displayName,
      isCurrentItem: nav.length === 0
    },
    ...nav.map((key, index) => ({
      key,
      text: state.nav[key].text,
      isCurrentItem: index === nav.length - 1
    }))
  ]
  return items
}
