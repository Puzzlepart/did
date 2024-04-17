import { ReusableComponent } from 'components/types'
import React, { HTMLAttributes } from 'react'
import styles from './FormGroup.module.scss'

interface IFormGroupProps
  extends Omit<HTMLAttributes<any>, 'onChange' | 'defaultChecked'> {
  gap?: number
}

/**
 * FormGroup component that wraps form controls.
 *
 * @category Reusable Component
 */
export const FormGroup: ReusableComponent<IFormGroupProps> = (props) => {
  return (
    <div className={FormGroup.className} style={{ gap: props.gap }}>
      {props.children}
    </div>
  )
}

FormGroup.className = styles.formGroup
FormGroup.defaultProps = {
  gap: 10
}
