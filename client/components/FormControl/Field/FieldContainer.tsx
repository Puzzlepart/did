import { Field, Label, mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { FormControlContext } from '../context'
import { FieldDescription } from '../FieldDescription'
import { ValidationResult } from '../types'
import { useFormControlValidation } from '../useFormControlValidation'
import styles from './FieldContainer.module.scss'
import { IFieldProps } from './types'

/**
 * Returns an object with validation message and state for a given field name.
 *
 * @param validationMessages - The validation messages object returned from the `useFormControlValidation` hook.
 * @param name - The name of the field to get validation props for.
 *
 * @returns An object with `validationMessage` and `validationState` properties.
 */
function getValidatioProps(
  validationMessages: ReturnType<
    typeof useFormControlValidation
  >['validationMessages'],
  name: string
) {
  const [validationMessage = null, validationState = 'none'] =
    validationMessages.value<ValidationResult>(name, [])
  return {
    validationMessage,
    validationState
  }
}

/**
 * @category Reusable Component
 */
export const FieldContainer: StyledComponent<IFieldProps> = (props) => {
  return (
    <FormControlContext.Consumer>
      {({ validationMessages }) => (
        <Field
          className={mergeClasses(FieldContainer.className, props.className)}
          {..._.pick(props, 'hidden', 'onKeyDown')}
          {...getValidatioProps(validationMessages, props.name)}
        >
          <div className={styles.label}>
            <Label
              required={props.required}
              disabled={props.disabled}
              weight='semibold'
            >
              {props.label}
            </Label>
          </div>
          {props.children}
          {props.description && <FieldDescription text={props.description} />}
        </Field>
      )}
    </FormControlContext.Consumer>
  )
}

FieldContainer.displayName = 'FieldContainer'
FieldContainer.className = styles.fieldContainer
FieldContainer.defaultProps = {
  name: 'unregistered_field'
}
