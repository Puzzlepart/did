import { Label } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './FieldLabel.module.scss'
import { IFieldLabelProps } from './types'

/**
 * @category Reusable Component
 */
export const FieldLabel: StyledComponent<IFieldLabelProps> = (props) => {
  return (
    <div className={FieldLabel.className} hidden={props.hidden}>
      <Label
        className={styles.label}
        required={props.required}
        disabled={props.disabled}
        weight={props.weight}
        style={{
          fontSize: props.fontSize
        }}
      >
        {props.text}
      </Label>
    </div>
  )
}

FieldLabel.displayName = 'FieldLabel'
FieldLabel.className = styles.fieldLabel
FieldLabel.defaultProps = {
  weight: 'semibold',
  fontSize: 10
}
