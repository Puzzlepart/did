import { LabelProps } from '@fluentui/react-components'
import { CSSProperties } from 'react'

export interface IFieldLabelProps
  extends LabelProps,
    Pick<CSSProperties, 'fontSize'> {
  text?: string
}
