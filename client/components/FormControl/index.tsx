import { BasePanel } from 'components/BasePanel'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './FormControl.module.scss'
import { IFormControlProps } from './types'

/**
 * @category Reusable Component
 */
export const FormControl: ReusableComponent<IFormControlProps> = (props) => (
  <>
    <ConditionalWrapper
      condition={!!props.panelProps}
      wrapper={(children) => (
        <BasePanel
          {...props.panelProps}
          footerActions={[
            {
              ...props.submitProps,
              hidden: !props.submitProps?.text,
              appearance: 'primary'
            }
          ]}
        >
          {children}
        </BasePanel>
      )}
    >
      <div className={styles.root}>{props.children}</div>
    </ConditionalWrapper>
    <Toast {...props.submitProps?.toast} />
  </>
)

FormControl.defaultProps = {
  submitProps: {
    text: undefined
  }
}

export * from './CheckboxControl'
export * from './DropdownControl'
export * from './TextControl'
export * from './types'
export { useFormControls } from './useFormControls'
