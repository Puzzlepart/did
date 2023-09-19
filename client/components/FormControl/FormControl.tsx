import { PanelType } from '@fluentui/react'
import { BasePanel } from 'components/BasePanel'
import { Footer } from 'components/BasePanel/Footer'
import { JsonDebug } from 'components/JsonDebug'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React, { ReactElement } from 'react'
import { FormControlContext } from './context'
import styles from './FormControl.module.scss'
import { IFormControlProps } from './types'
import { useFormControl } from './useFormControl'

/**
 * FormControl component that handles form submission and validation.
 *
 * It can render in a `<BasePanel />` or as a standalone component. If
 * providing `panelProps`, it will render in a panel. Otherwise, it will
 * render as a standalone component. When rendering in a panel, the default
 * type will be `PanelType.medium` - this can be overridden by providing
 * `panelProps.type`.
 *
 * @category Reusable Component
 */
export const FormControl: ReusableComponent<IFormControlProps> = (props) => {
  const { context, submitAction } = useFormControl(props)
  const content: ReactElement = (
    <>
      <div className={FormControl.className}>{props.children}</div>
      {props.debug && <JsonDebug obj={props.model.$} />}
    </>
  )
  return (
    <FormControlContext.Provider value={context}>
      {props.panelProps ? (
        <BasePanel
          type={PanelType.medium}
          {...props.panelProps}
          footerActions={[submitAction]}
        >
          {content}
        </BasePanel>
      ) : (
        <>
          {content}
          <Footer actions={[submitAction]} />
        </>
      )}
      <Toast {...props.submitProps?.toast} />
    </FormControlContext.Provider>
  )
}

FormControl.className = styles.formControl
FormControl.defaultProps = {
  submitProps: {
    text: undefined
  }
}
