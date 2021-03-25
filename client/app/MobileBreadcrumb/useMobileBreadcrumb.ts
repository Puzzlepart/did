/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
import { useAppContext } from 'AppContext'
import { ITabContainerProps } from 'components/TabContainer'
import { find, IPivotItemProps } from '@fluentui/react-react'
import { useEffect, useRef } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'

/**
 * Hook used by `<ITabContainer />` component to update the
 * app navigation state rendered by the `<MobileBreadcrumb />`
 * component.
 *
 * @remarks Currently only supports `<TabContainer />`, but can
 * be extended if it needs to support other components in the
 * future.
 *
 * @returns The `ref` to be used by the `<TabContainer />` component
 */
export function useMobileBreadcrumb(props: ITabContainerProps) {
  const ref = useRef(null)
  const { state, dispatch } = useAppContext()
  useEffect(() => {
    const items: any[] = props.items || ref?.current?.props?.children
    const current_ = find(items, (item) => {
      const itemKey = item?.props?.itemKey || item.itemKey
      return itemKey === props.selectedKey
    })
    const nav: IPivotItemProps = current_?.props || current_
    if (state.nav !== nav) {
      dispatch(
        UPDATE_BREADCRUMB([
          {
            key: nav?.itemKey,
            text: nav?.headerText,
            level: props.level
          },
          !nav && [props.level]
        ])
      )
    }
  }, [props.selectedKey, props.items])
  return ref
}
