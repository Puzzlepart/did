import { Button, ButtonProps, Tooltip } from '@fluentui/react-components'
import React from 'react'
import { getFluentIconWithFallback } from 'utils'
import { IUserMessageProps } from './types'

export const UserMessageAction = (props: IUserMessageProps) => {
  if (!props.action) return null
  const buttonProps: ButtonProps = {
    onClick: (event: React.MouseEvent<any>) => {
      event.stopPropagation()
      event.preventDefault()
      props.action.onClick(null)
    },
    icon: getFluentIconWithFallback(props.action.iconName, {
      bundle: true,
      color: props.action.iconColor
    }),
    appearance: 'transparent'
  }

  return (
    <Tooltip relationship='description' content={props.action.text}>
      <Button {...buttonProps} />
    </Tooltip>
  )
}
