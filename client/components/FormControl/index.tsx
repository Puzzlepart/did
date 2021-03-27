/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { Panel, PrimaryButton } from '@fluentui/react'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './FormControl.module.scss'
import { IFormControlProps } from './types'

/**
 * @category Reusable Component
 */
export const FormControl: ReusableComponent<IFormControlProps> = (props) => {
  return (
    <ConditionalWrapper
      condition={!!props.panelProps}
      wrapper={(children) => <Panel {...props.panelProps}>{children}</Panel>}>
      <div className={styles.root}>
        {props.children}
        <div>
          <PrimaryButton {...props?.submitProps} />
        </div>
        <Toast {...props.submitProps?.toast} />
      </div>
    </ConditionalWrapper>
  )
}

FormControl.defaultProps = {
  submitProps: {}
}

export * from './types'
export { useFormControls } from './useFormControls'