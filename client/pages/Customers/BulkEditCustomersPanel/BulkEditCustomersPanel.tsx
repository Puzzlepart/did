import { Field, Label } from '@fluentui/react-components'
import { LabelPickerControl, SwitchControl } from 'components/FormControl'
import { Panel } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBulkEditCustomersPanelProps } from './types'
import { useBulkEditCustomersPanel } from './useBulkEditCustomersPanel'

export const BulkEditCustomersPanel: React.FC<IBulkEditCustomersPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const { model, loading, handleSave } = useBulkEditCustomersPanel(props)

  return (
    <Panel
      open={props.open}
      onDismiss={props.onDismiss}
      type='overlay'
      lightDismiss={false}
      title={t('customers.bulkEdit.title', {
        count: props.customers.length
      })}
      description={t('customers.bulkEdit.description')}
      actions={[
        {
          appearance: 'primary',
          text: t('common.save'),
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

        <LabelPickerControl
          label={t('common.labelsText')}
          placeholder={t('common.filterLabels')}
          noSelectionText={t('customers.noLabelsSelectedText')}
          defaultSelectedKeys={model.value('labels')}
          onChange={(selectedLabels) =>
            model.set(
              'labels',
              selectedLabels.map((lbl) => lbl.name)
            )
          }
        />

        <SwitchControl
          name='inactive'
          model={model}
          label={t('common.inactiveFieldLabel')}
          description={t('customers.inactiveFieldDescription')}
        />
      </div>
    </Panel>
  )
}

BulkEditCustomersPanel.displayName = 'BulkEditCustomersPanel'
