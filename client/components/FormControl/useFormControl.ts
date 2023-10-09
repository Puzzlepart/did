import { IDynamicButtonProps, IFormControlContext } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { CLEAR_VALIDATION_MESSAGES, useFormControlReducer } from './reducer'
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
    context: IFormControlContext
    submitAction: IDynamicButtonProps
  }
> = (props) => {
  const [state, dispatch] = useFormControlReducer()
  const validateForm = useFormControlValidation(dispatch)

  const submitAction = useMemo<IDynamicButtonProps>(
    () => ({
      ...props.submitProps,
      onClick: async (event: any) => {
        dispatch(CLEAR_VALIDATION_MESSAGES())
        if (await validateForm(props.children as ReactElement[])) {
          if (props.panel?.onDismiss) {
            props.panel.onDismiss()
          }
          return props.submitProps.onClick(event)
        }
      },
      primary: true
    }),
    [props.submitProps]
  )

  const context = useMemo<IFormControlContext>(
    () => ({
      ...state,
      model: props.model,
      dispatch,
      onBlurCallback: (event) => {
        if (props.validateOnBlur) {
          const [, name] = event.target.id.split('_')
          const field = (props.children as ReactElement[]).find(
            ({ props }) => props['name'] === name
          )
          validateForm([field])
        }
      }
    }),
    [state, props.model]
  )

  return { context, submitAction }
}
