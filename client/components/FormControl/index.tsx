import { Panel, PrimaryButton } from '@fluentui/react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
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
    <>
      <ConditionalWrapper
        condition={!!props.panelProps}
        wrapper={(children) => (
          <Panel {...props.panelProps}>
            <FluentProvider theme={webLightTheme}>
              {children}
            </FluentProvider>
          </Panel>
        )}
      >
        <div className={styles.root}>
          {props.children}
          <div hidden={!props.submitProps?.text}>
            <PrimaryButton {...props.submitProps} />
          </div>
        </div>
      </ConditionalWrapper>
      <Toast {...props.submitProps?.toast} />
    </>
  )
}

FormControl.defaultProps = {
  submitProps: {}
}

export * from './CheckboxControl'
export * from './DropdownControl'
export * from './TextControl'
export * from './types'
export { useFormControls } from './useFormControls'

