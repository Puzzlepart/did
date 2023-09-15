import { IBasePanelAction } from 'components'
import { useMemo } from 'react'
import { IFormControlProps } from './types'

export function useFormControl(props: IFormControlProps) {
  const footerActions = useMemo<IBasePanelAction[]>(
    () => [
      {
        ...props.submitProps,
        hidden: !props.submitProps?.text,
        appearance: 'primary'
      }
    ],
    [props.submitProps]
  )

  return { footerActions }
}
