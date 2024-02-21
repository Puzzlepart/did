import { IShimmerProps } from '@fluentui/react'
import { LabelProps } from '@fluentui/react-components'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export interface IInformationPropertyProps
  extends LabelProps,
    Pick<IShimmerProps, 'isDataLoaded'> {
  value?: string
  onRenderValue?: (value: string) => ReactElement
}
