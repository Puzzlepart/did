import { DialogOpenChangeData } from '@fluentui/react-components'
import { IPanelProps } from './types'

/**
 * Component logic hook for `<Panel />`. For now it only handles
 * the `onOpenChange` event (which is using `DialogOpenChangeData`
 * for data for some reason).
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

  return { onOpenChange }
}
