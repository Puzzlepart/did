import React from 'react'
import { StyledComponent } from 'types'
import { FormControlContext } from '../../context'
import styles from './FieldErrorMessage.module.scss'

export const FieldErrorMessage: StyledComponent<{ name: string }> = (props) => {
  return (
    <FormControlContext.Consumer>
      {({ validationMessages: errorMessages }) => {
        const errorMessage = errorMessages.value<string>(props.name, null)
        if (!errorMessage) return null
        return (
          <div className={FieldErrorMessage.className}>
            <span>{errorMessage}</span>
          </div>
        )
      }}
    </FormControlContext.Consumer>
  )
}

FieldErrorMessage.displayName = 'FieldErrorMessage'
FieldErrorMessage.className = styles.fieldErrorMessage
