/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
import { useAppContext } from 'AppContext'
import { IFlexiblePivotProps } from 'components/FlexiblePivot/types'
import { find, IPivotItemProps } from 'office-ui-fabric-react'
import { useEffect, useRef } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'

/**
 * Hook used by `<FlexiblePivot />` component to update the
 * app navigation state rendered by the `<MobileBreadcrumb />`
 * component.
 *
 * @remarks Currently only supports `<FlexiblePivot />`, but can
 * be extended if it needs to support other components in the
 * future.
 *
 * @returns The `ref` to be used by the `<FlexiblePivot />` component
 */
export function useMobileBreadcrumb(props: IFlexiblePivotProps) {
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
            level: 2
          },
          !nav && [2]
        ])
      )
    }
  }, [props.selectedKey, props.items])
  return ref
}
