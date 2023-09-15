import { IDynamicButtonProps } from 'components'
import { useMemo } from 'react'
import { IFormControlProps } from './types'

export function useFormControl({ model, submitProps }: IFormControlProps) {
  const footerActions = useMemo<IDynamicButtonProps[]>(
    () => [
      {
        ...submitProps,
        onClick: (event) =>
          submitProps?.onSave
            ? submitProps?.onSave(model)
            : submitProps.onClick(event),
        hidden: !submitProps?.text,
        primary: true
      }
    ],
    [submitProps?.disabled]
  )

  return { footerActions }
}
