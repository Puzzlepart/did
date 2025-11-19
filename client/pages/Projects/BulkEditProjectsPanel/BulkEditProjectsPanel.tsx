import { Field, Label } from '@fluentui/react-components'
import {
  LabelPickerControl,
  ProjectPickerControl,
  SwitchControl
} from 'components/FormControl'
import { Panel, SearchCustomer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBulkEditProjectsPanelProps } from './types'
import { useBulkEditProjectsPanel } from './useBulkEditProjectsPanel'

export const BulkEditProjectsPanel: React.FC<IBulkEditProjectsPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const { model, loading, handleSave } = useBulkEditProjectsPanel(props)

  return (
    <Panel
      open={props.open}
      onDismiss={props.onDismiss}
      type='overlay'
      lightDismiss={false}
      title={t('projects.bulkEdit.title', {
        count: props.projects.length
      })}
      description={t('projects.bulkEdit.description')}
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
            {t('projects.bulkEdit.selectedProjects')}
          </Label>
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

        <LabelPickerControl
          label={t('common.labelsText')}
          placeholder={t('common.filterLabels')}
          noSelectionText={t('projects.noLabelsSelectedText')}
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
          description={t('projects.inactiveFieldDescription')}
        />

        <SearchCustomer
          label={t('projects.partnerCustomer')}
          description={t('projects.partnerCustomerDescription')}
          placeholder={t('common.searchPlaceholder')}
          selectedKey={model.value('partnerKey')}
          onSelected={(customer) => model.set('partnerKey', customer?.key)}
          maxSuggestions={8}
        />

        <ProjectPickerControl
          name='parentKey'
          model={model}
          label={t('projects.parentProject')}
          description={t('projects.parentProjectDescription')}
          disabledText={t('projects.parentProjectDisabledText')}
        />
      </div>
    </Panel>
  )
}

BulkEditProjectsPanel.displayName = 'BulkEditProjectsPanel'
