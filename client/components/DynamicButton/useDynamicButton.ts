import { ButtonProps } from '@fluentui/react-components'
import _ from 'underscore'
import { getFluentIconWithFallback, switchCase } from 'utils'
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
      icon: getFluentIconWithFallback(props.iconName)
    }
  }
  buttonProps.appearance = switchCase<null, IDynamicButtonProps['appearance']>([
    [props.primary, 'primary'],
    [props.secondary, 'secondary'],
    [props.subtle, 'subtle']
  ])
  return buttonProps
}
