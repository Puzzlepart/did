import {
  Checkbox,
  Field,
  Label
} from '@fluentui/react-components'
import { LabelPickerControl } from 'components/FormControl'
import { Panel } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBulkEditCustomersPanelProps } from './types'
import { useBulkEditCustomersPanel } from './useBulkEditCustomersPanel'

export const BulkEditCustomersPanel: React.FC<
  IBulkEditCustomersPanelProps
> = (props) => {
  const { t } = useTranslation()
  const {
    inactive,
    setInactive,
    setLabels,
    loading,
    handleSave
  } = useBulkEditCustomersPanel(props)

  return (
    <Panel
      open={props.open}
      onDismiss={props.onDismiss}
      title={t('customers.bulkEdit.title', {
        count: props.customers.length
      })}
      description={t('customers.bulkEdit.description')}
      actions={[
        {
          appearance: 'primary',
          text: t('common.saveButtonLabel'),
          onClick: handleSave,
          disabled: loading
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field>
          <Label weight='semibold'>
            {t('customers.bulkEdit.selectedCustomers')}
          </Label>
          <div style={{ marginTop: '8px' }}>
            {props.customers.map((customer) => (
              <div
                key={customer.key}
                style={{
                  padding: '4px 0',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                {customer.name}
              </div>
            ))}
          </div>
        </Field>

        <Field>
          <Label>{t('common.labelsText')}</Label>
          <LabelPickerControl
            placeholder={t('common.filterLabels')}
            noSelectionText={t('customers.noLabelsSelectedText')}
            onChange={(selectedLabels) =>
              setLabels(selectedLabels.map((lbl) => lbl.name))
            }
          />
        </Field>

        <Field>
          <Checkbox
            checked={inactive === true}
            onChange={(_, data) =>
              setInactive(data.checked === true ? true : null)
            }
            label={t('common.inactiveFieldLabel')}
          />
        </Field>
      </div>
    </Panel>
  )
}

BulkEditCustomersPanel.displayName = 'BulkEditCustomersPanel'
