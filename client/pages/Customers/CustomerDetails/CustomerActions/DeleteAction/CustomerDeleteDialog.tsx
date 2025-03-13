import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldProps,
  ProgressBar
} from '@fluentui/react-components'
import { Markdown } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { ICustomerDeleteDialogProps } from './types'

/**
 * Component for displaying a dialog to confirm the deletion of a customer.
 *
 * @param props - The properties for the CustomerDeleteDialog component.
 *
 * @returns The rendered CustomerDeleteDialog component.
 */
export const CustomerDeleteDialog: FC<ICustomerDeleteDialogProps> = ({
  customer,
  state,
  setState,
  message,
  loading,
  onDelete
}) => {
  const { t } = useTranslation()

  const isInitial = state === 'initial'
  const isChecking = state === 'checking'
  const isError = state === 'error'
  const isSuccess = state === 'success'

  return (
    <Dialog open={state !== 'hidden'}>
      <DialogSurface className="customerDeleteDialog">
        <DialogBody>
          <DialogTitle>{t('customers.deleteDialogTitle')}</DialogTitle>
          <DialogContent>
            <div hidden={state !== 'initial'}>
              <Markdown
                text={t('customers.deleteConfirmation', {
                  ...customer,
                  name: customer?.name?.trim()
                })}
              />
            </div>
            <div
              className="checkProgress"
              style={{ display: isInitial ? 'none' : 'flex' }}
            >
              {getFluentIcon('Timer', { size: 60 })}
              <Field
                className="field"
                label={t('customers.deleteCheckLabel')}
                hint={isChecking && t('customers.deleteCheckHint')}
                validationState={
                  (isChecking ? 'none' : state) as FieldProps['validationState']
                }
                validationMessage={message}
              >
                <ProgressBar value={isChecking ? undefined : 1} />
              </Field>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              appearance='primary'
              disabled={loading || isError}
              onClick={() => {
                if (isSuccess) onDelete(customer)
                else setState('checking')
              }}
            >
              {state === 'success'
                ? t('customers.deleteButtonLabel')
                : t('customers.checkButtonLabel')}
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance='secondary'
                disabled={loading}
                onClick={() => setState('hidden')}
              >
                {t('common.abort')}
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}