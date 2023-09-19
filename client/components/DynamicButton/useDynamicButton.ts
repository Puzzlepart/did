import { ButtonProps } from '@fluentui/react-components'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
import { IDynamicButtonProps } from './types'

/**
 * Returns the props for a dynamic button based on the provided `IDynamicButtonProps`.
 *
 * @param props - The props for the dynamic button.
 *
 * @returns The props for the button.
 */
export function useDynamicButton(props: IDynamicButtonProps) {
  let buttonProps = _.omit(props, 'hidden', 'text') as ButtonProps
  if (props.iconName) {
    buttonProps = {
      ...buttonProps,
      icon: getFluentIcon(props.iconName)
    }
  }
  if (props.primary) buttonProps.appearance = 'primary'
  else if (props.secondary) buttonProps.appearance = 'secondary'
  else if (props.subtle) buttonProps.appearance = 'subtle'
  return buttonProps
}
