import { BasePanel } from 'components/BasePanel'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Toast } from 'components/Toast'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FormControl.module.scss'
import { IFormControlProps } from './types'

/**
 * @category Reusable Component
 */
export const FormControl: ReusableComponent<IFormControlProps> = (props) => {
  const { t } = useTranslation()
  return (
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
              },
              {
                text: t('common.cancelButtonLabel'),
                appearance: 'subtle'
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
}

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
