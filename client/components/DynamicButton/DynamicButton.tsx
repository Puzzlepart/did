import { Button, MenuTrigger } from '@fluentui/react-components'
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
  if (props.menuTrigger) {
    return (
      <MenuTrigger disableButtonEnhancement>
        <Button {...buttonProps}>{props.text}</Button>
      </MenuTrigger>
    )
  }
  return (
    <div className={DynamicButton.className} hidden={props.hidden}>
      <Button {...buttonProps}>{props.text}</Button>
    </div>
  )
}

DynamicButton.displayName = 'DynamicButton'
DynamicButton.className = styles.dynamicButton
DynamicButton.defaultProps = {
  text: '',
  appearance: 'secondary'
}
