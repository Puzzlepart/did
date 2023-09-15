import { IDynamicButtonProps } from 'components'
import { useMemo } from 'react'
import { IFormControlProps } from './types'

/**
 * Hook that returns an object with `footerActions` to be used in a form control.
 *
 * @param model - The form model.
 * @param submitProps - The submit button props.
 *
 * @returns An object with footerActions.
 */
export function useFormControl({ submitProps }: IFormControlProps) {
  const footerActions = useMemo<IDynamicButtonProps[]>(
    () => [
      {
        ...submitProps,
        hidden: !submitProps?.text,
        primary: true
      }
    ],
    [submitProps]
  )

  return { footerActions }
}
