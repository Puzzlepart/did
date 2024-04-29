import { IDynamicButtonProps, IFormControlContext } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { CLEAR_VALIDATION_MESSAGES, useFormControlReducer } from './reducer'
import { IFormControlProps } from './types'
import { useFormControlValidation } from './useFormControlValidation'
import React from 'react'
import _ from 'lodash'

/**
 * Get the children of the form control. If children
 * is a `Pivot` component, it will return the children of all
 * the `PivotItem` components.
 *
 * @param children The children of the form control.
 *
 * @returns The children of the form control.
 */
function getChildControls(children: any) {
  const controls = React.Children.toArray(children).flatMap((child: any) => {
    if (child.props?.children) {
      return getChildControls(child.props.children)
    }
    return child
  })
  return controls
}

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
  const validateForm = useFormControlValidation(props, dispatch)

  const submitAction = useMemo<IDynamicButtonProps>(
    () => ({
      ...props.submitProps,
      onClick: async (event: any) => {
        dispatch(CLEAR_VALIDATION_MESSAGES())
        if (await validateForm(getChildControls(props.children))) {
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

  /**
   * Retrieves the value of a specific extension property for a given key and extension ID.
   *
   * @param key - The key of the extension property.
   * @param extensionId - The ID of the extension.
   *
   * @returns The value of the extension property, or undefined if not found.
   */
  const getExtensionValue = <T = any>(key: string, extensionId: string) => {
    return _.get(
      props.model.$,
      `extensions.${extensionId}.properties.${key}`
    ) as T
  }

  const context = useMemo<IFormControlContext>(
    () => ({
      ...state,
      ..._.pick(props, [
        'model',
        'register',
        'additionalContext',
        'isEditMode'
      ]),
      getExtensionValue,
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
