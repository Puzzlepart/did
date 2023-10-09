import { Drawer, DrawerBody } from '@fluentui/react-components/unstable'
import { Footer } from 'components/BasePanel/Footer'
import { JsonDebug } from 'components/JsonDebug'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './FormControl.module.scss'
import { FormControlContext } from './context'
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
  const content = (
    <>
      <div className={FormControl.className}>{props.children}</div>
      {props.debug && <JsonDebug obj={props.model.$} />}
    </>
  )
  return (
    <FormControlContext.Provider value={context}>
      {props.panelProps ? (
        <Drawer
          open={props.panelProps.isOpen}
          type='overlay'
          position='end'
        >
          <DrawerBody>
            {content}
          </DrawerBody>
        </Drawer>
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
