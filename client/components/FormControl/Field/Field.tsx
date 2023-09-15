import { Label } from '@fluentui/react-components'
import { css } from '@fluentui/react/lib/Utilities'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { FieldDescription } from '../FieldDescription'
import styles from './Field.module.scss'
import { IFieldProps } from './types'

/**
 * Text field based on `<Switch />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const Field: StyledComponent<IFieldProps> = (props) => (
  <div
    className={css(Field.className, props.className)}
    {..._.pick(props, 'hidden', 'onKeyDown')}
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
    {props.errorMessage && (
      <UserMessage intent='error'>{props.errorMessage}</UserMessage>
    )}
  </div>
)

Field.displayName = 'Field'
Field.className = styles.field
