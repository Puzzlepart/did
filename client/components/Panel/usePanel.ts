import { DialogOpenChangeData } from '@fluentui/react-components'
import { IPanelProps } from './types'
import { CSSProperties } from 'react'

/**
 * Component logic hook for `<Panel />`. For now it only handles
 * the `onOpenChange` event (which is using `DialogOpenChangeData`
 * for data for some reason).
 *
 * @param props - The props passed to the `Panel` component.
 */
export function usePanel(props: IPanelProps) {
  /**
   *  If the panel is closed by clicking outside it, we want to
   * call `props.onDismiss` to close it. This replaces the
   * `isLightDismiss` prop from the old `Panel` component.
   */
  const onOpenChange = (_: any, data: DialogOpenChangeData) => {
    if (data.type === 'backdropClick' && !data.open && props.lightDismiss) {
      props.onDismiss()
    }
  }

  const bodyStyle: CSSProperties = {}

  if (props.contentGap) {
    bodyStyle.display = 'flex'
    bodyStyle.flexDirection = 'column'
    bodyStyle.gap = `${props.contentGap}px`
  }

  return { onOpenChange, bodyStyle }
}
