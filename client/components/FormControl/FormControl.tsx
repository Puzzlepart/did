import { css, PanelType } from '@fluentui/react'
import { BasePanel } from 'components/BasePanel'
import { Footer } from 'components/BasePanel/Footer/Footer'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React from 'react'
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
  const { footerActions, contentId } = useFormControl(props)
  return (
    <FormControlContext.Provider value={{ model: props.model }}>
      <div className={FormControl.className}>
        <ConditionalWrapper
          condition={!!props.panelProps}
          wrapper={(children) => (
            <BasePanel
              type={PanelType.medium}
              {...props.panelProps}
              footerActions={footerActions}
            >
              {children}
            </BasePanel>
          )}
        >
          <div
            className={css(
              styles.content,
              props.panelProps ? styles.panel : styles.standalone
            )}
            id={contentId}
          >
            {props.children}
          </div>
          <Footer
            hidden={!!props.panelProps}
            actions={[
              {
                ...props.submitProps,
                hidden: !props.submitProps?.text,
                appearance: 'primary'
              }
            ]}
          />
        </ConditionalWrapper>
        <Toast {...props.submitProps?.toast} />
      </div>
    </FormControlContext.Provider>
  )
}

FormControl.className = styles.formControl
FormControl.defaultProps = {
  submitProps: {
    text: undefined
  }
}
