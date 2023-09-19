import { IShimmerProps } from '@fluentui/react'
import { LabelProps } from '@fluentui/react-components'

export interface IInformationPropertyProps
  extends LabelProps,
    Pick<IShimmerProps, 'isDataLoaded'> {
  value?: string
}
