import { IDynamicButtonProps } from 'components'
import { useMemo } from 'react'
import { IFormControlProps } from './types'

export function useFormControl(props: IFormControlProps) {
  const footerActions = useMemo<IDynamicButtonProps[]>(
    () => [
      {
        ...props.submitProps,
        hidden: !props.submitProps?.text,
        primary: true
      }
    ],
    [props.submitProps?.disabled]
  )

  return { footerActions }
}
