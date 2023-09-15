import { ButtonProps } from '@fluentui/react-components'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
import { IDynamicButtonProps } from './types'

export function useDynamicButton(props: IDynamicButtonProps) {
  let buttonProps = _.omit(props, 'hidden', 'text') as ButtonProps
  if (props.iconName) {
    buttonProps = {
      ...buttonProps,
      icon: getFluentIcon(props.iconName)
    }
  }
  if (props.primary) {
    buttonProps = {
      ...buttonProps,
      appearance: 'primary'
    }
  }
  if (props.secondary) {
    buttonProps = {
      ...buttonProps,
      appearance: 'secondary'
    }
  }
  if (props.subtle) {
    buttonProps = {
      ...buttonProps,
      appearance: 'subtle'
    }
  }
  return buttonProps
}
