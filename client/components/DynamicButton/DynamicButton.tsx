import {
  Button,
  MenuTrigger,
  mergeClasses,
  PopoverTrigger
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './DynamicButton.module.scss'
import { IDynamicButtonProps } from './types'
import { useDynamicButton } from './useDynamicButton'

/**
 * The DynamicButton component is a wrapper around the `Button` component from
 * [@fluentui/react-components](@fluentui/react-components) that allows for
 * properties like `text` and `hidden`. The default `appearance` is `secondary`.
 */
export const DynamicButton: ReusableComponent<IDynamicButtonProps> = (
  props
) => {
  const buttonProps = useDynamicButton(props)
  switch (props.triggerFor) {
    case 'Menu': {
      return (
        <MenuTrigger disableButtonEnhancement>
          <Button {...buttonProps}>{props.text}</Button>
        </MenuTrigger>
      )
    }
    case 'Popover': {
      return (
        <PopoverTrigger disableButtonEnhancement>
          <Button {...buttonProps}>{props.text}</Button>
        </PopoverTrigger>
      )
    }
    default: {
      return (
        <div
          className={mergeClasses(
            DynamicButton.className,
            props.className,
            props.fadeIn === true && styles.fadeIn,
            props.fadeIn === false && styles.fadeOut
          )}
          hidden={props.hidden}
        >
          <Button {...buttonProps}>{props.text}</Button>
        </div>
      )
    }
  }
}

DynamicButton.displayName = 'DynamicButton'
DynamicButton.className = styles.dynamicButton
DynamicButton.defaultProps = {
  text: '',
  appearance: 'subtle',
  hidden: false,
  disabled: false
}
