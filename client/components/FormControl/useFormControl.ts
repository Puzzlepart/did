import { IBasePanelProps, IDynamicButtonProps } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { IFormControlProps } from './types'
import { useFormControlValidation } from './useFormControlValidation'

/**
 * Hook that returns an object with `footerActions` to be used in a form control.
 *
 * @param submitProps - The submit button props.
 *
 * @returns An object with `footerActions`.
 */
export const useFormControl: ComponentLogicHook<
  IFormControlProps,
  {
    footerActions: IBasePanelProps['footerActions']
    validationMessages: ReturnType<
      typeof useFormControlValidation
    >['validationMessages']
  }
> = ({ children, submitProps }) => {
  const { validationMessages, validateForm } = useFormControlValidation()
  const footerActions = useMemo<IDynamicButtonProps[]>(
    () => [
      {
        ...submitProps,
        onClick: (event: any) => {
          if (validateForm(children as ReactElement[])) {
            return submitProps.onClick(event)
          }
        },
        primary: true
      }
    ],
    [submitProps]
  )

  return { validationMessages, footerActions }
}
