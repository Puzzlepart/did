import { Button } from '@fluentui/react-components'
import React, { FC } from 'react'
import _ from 'underscore'
import { IBasePanelAction } from './types'

export const PanelAction: FC<IBasePanelAction> = (props) => {
  return (
    <div hidden={props.hidden}>
      <Button {..._.omit(props, 'text', 'hidden')}>{props.text}</Button>¨
    </div>
  )
}
