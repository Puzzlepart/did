import { Field, Label, mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { FormControlContext, IFormControlContext } from '../context'
import { FieldDescription } from '../FieldDescription'
import styles from './FieldContainer.module.scss'
import { IFieldProps } from './types'

/**
 * Returns an object with validation message and state for a given field name.
 *
 * @param context - The form control context.
 * @param name - The name of the field to get validation props for.
 *
 * @returns An object with `validationMessage` and `validationState` properties.
 */
function getValidationProps(context: IFormControlContext, name: string) {
  if (!context) return [null, 'none']
  const { validationMessages } = context
  const [validationMessage = null, validationState = 'none'] =
    validationMessages.get(name) ?? []
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
    !props.hidden && (
      <FormControlContext.Consumer>
        {(context) => (
          <Field
            className={mergeClasses(FieldContainer.className, props.className)}
            {..._.pick(props, 'onKeyDown')}
            {...getValidationProps(context, props.name)}
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
  )
}

FieldContainer.displayName = 'FieldContainer'
FieldContainer.className = styles.fieldContainer
FieldContainer.defaultProps = {
  name: 'unregistered_field'
}
