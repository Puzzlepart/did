import { Field, mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { FormControlContext, IFormControlContext } from '../context'
import { FieldDescription } from '../FieldDescription'
import styles from './FieldContainer.module.scss'
import { FieldLabel } from './FieldLabel'
import { IFieldProps } from './types'

/**
 * Returns an object with validation message and state for a given field name.
 *
 * @param context - The form control context.
 * @param name - The name of the field to get validation props for.
 * @param validation - An optional tuple containing validation state and message.
 *
 * @returns An object with `validationMessage` and `validationState` properties.
 */
function getValidationProps(
  context: IFormControlContext,
  name: string,
  validation: IFieldProps['validation']
) {
  if (!context)
    return { validationMessage: validation[0], validationState: validation[1] }
  const { validationMessages } = context
  const [validationMessage = null, validationState = 'none'] =
    validationMessages.get(name) ?? validation
  return {
    validationMessage,
    validationState
  }
}

/**
 * @category Reusable Component
 */
export const FieldContainer: StyledComponent<IFieldProps> = (props) =>
  !props.hidden && (
    <FormControlContext.Consumer>
      {(context) => (
        <Field
          className={mergeClasses(FieldContainer.className, props.className)}
          {..._.pick(props, 'onKeyDown', 'title', 'style')}
          {...getValidationProps(context, props.name, props.validation)}
        >
          <FieldLabel
            {...props.labelProps}
            required={props.required}
            disabled={props.disabled}
            text={props.label}
          />
          {props.children}
          {props.description && <FieldDescription text={props.description} />}
        </Field>
      )}
    </FormControlContext.Consumer>
  )

FieldContainer.displayName = 'FieldContainer'
FieldContainer.className = styles.fieldContainer
FieldContainer.defaultProps = {
  name: 'unregistered_field',
  labelProps: {
    weight: 'semibold'
  },
  validation: [null, 'none']
}
