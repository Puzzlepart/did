import { Button, ButtonProps, Tooltip } from '@fluentui/react-components'
import React, { FC } from 'react'
import { getFluentIcon } from 'utils'
import { IUserMessageAction } from './types'

export const UserMessageAction: FC<IUserMessageAction> = (props) => {
  const buttonProps: ButtonProps = {
    onClick: (event: React.MouseEvent<any>) => {
      event.stopPropagation()
      event.preventDefault()
      props.onClick(null)
    },
    icon: getFluentIcon(props.iconName, {
      bundle: true,
      color: props.iconColor
    }),
    appearance: 'transparent'
  }

  return (
    <Tooltip relationship='description' content={props.text}>
      <Button {...buttonProps} />
    </Tooltip>
  )
}
