import { Skeleton, SkeletonItem } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import _ from 'lodash'
import React from 'react'
import { IShimmeredProps } from './types'

export const Shimmered: ReusableComponent<IShimmeredProps> = (props) => {
  return (
    <div className={props.className}>
      {props.isDataLoaded ? (
        props.children
      ) : (
        <Skeleton>
          <SkeletonItem style={_.pick(props, ['width', 'height'])} />
        </Skeleton>
      )}
    </div>
  )
}
