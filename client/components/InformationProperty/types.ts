import { LabelProps } from '@fluentui/react-components'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export interface IInformationPropertyProps
  extends LabelProps,
    Pick<{ isDataLoaded?: boolean }, 'isDataLoaded'> {
  value?: string

  /**
   * Custom render function for the value.
   *
   * @param value Value passed to the component
   */
  onRenderValue?: (value: string) => ReactElement
}
