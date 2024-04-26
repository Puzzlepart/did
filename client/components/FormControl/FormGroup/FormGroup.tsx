import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './FormGroup.module.scss'
import { IFormGroupProps } from './types'

/**
 * FormGroup component that wraps form controls.
 *
 * @category Reusable Component
 */
export const FormGroup: ReusableComponent<IFormGroupProps> = (props) => {
  const className = [FormGroup.className, props.bordered && styles.bordered]
    .filter(Boolean)
    .join(' ')
  return (
    <div hidden={props.hidden} className={className} style={props.style}>
      <div className={styles.container} style={{ gap: props.gap }}>
        {props.title && (
          <span
            className={styles.title}
            style={{ width: props.title.length * 7.5 }}
          >
            {props.title}
          </span>
        )}
        {props.children}
      </div>
    </div>
  )
}

FormGroup.className = styles.formGroup
FormGroup.defaultProps = {
  gap: 10,
  style: { marginTop: 20 }
}
