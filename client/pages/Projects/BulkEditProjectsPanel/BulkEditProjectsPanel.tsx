import {
  Checkbox,
  Field,
  Label,
  Switch
} from '@fluentui/react-components'
import { LabelPickerControl } from 'components/FormControl'
import { Panel } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBulkEditProjectsPanelProps } from './types'
import { useBulkEditProjectsPanel } from './useBulkEditProjectsPanel'
import { SearchBox } from '@fluentui/react-components'

export const BulkEditProjectsPanel: React.FC<IBulkEditProjectsPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const {
    inactive,
    setInactive,
    labels,
    setLabels,
    partnerKey,
    setPartnerKey,
    loading,
    handleSave
  } = useBulkEditProjectsPanel(props)

  return (
    <Panel
      open={props.open}
      onDismiss={props.onDismiss}
      title={t('projects.bulkEdit.title', {
        count: props.projects.length
      })}
      description={t('projects.bulkEdit.description')}
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
          <Label weight='semibold'>{t('projects.bulkEdit.selectedProjects')}</Label>
          <div style={{ marginTop: '8px' }}>
            {props.projects.map((project) => (
              <div
                key={project.tag}
                style={{
                  padding: '4px 0',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                {project.name}
              </div>
            ))}
          </div>
        </Field>

        <Field>
          <Label>{t('common.labelsText')}</Label>
          <LabelPickerControl
            placeholder={t('common.filterLabels')}
            noSelectionText={t('projects.noLabelsSelectedText')}
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

        <Field>
          <Label>{t('projects.partnerCustomerLabel')}</Label>
          <SearchBox
            placeholder={t('projects.searchPartnerCustomer')}
            onChange={(_, data) => setPartnerKey(data.value || null)}
          />
        </Field>
      </div>
    </Panel>
  )
}

BulkEditProjectsPanel.displayName = 'BulkEditProjectsPanel'
