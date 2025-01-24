import { SearchCustomer } from 'components'
import {
  CheckboxControl,
  FormGroup,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  LabelPickerControl,
  ProjectPickerControl,
  useFormContext
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomersContext } from '../../../Customers/context'
import { ProjectKey } from './ProjectKey'
import { TagPreview } from './TagPreview'
import { ProjectFormTabComponent } from '../types'
import { CreateOutlookCategory } from './CreateOutlookCategory'
import { useSubscriptionSettings } from 'AppContext'
import { SubscriptionProjectsSettings } from 'types'

export const BasicInfo: ProjectFormTabComponent = () => {
  const { t } = useTranslation()
  const { model, register, isEditMode } = useFormContext()
  const settings =
    useSubscriptionSettings<SubscriptionProjectsSettings>('projects')
  const customerContext = useCustomersContext()
  const isCustomerContext = !!customerContext
  return (
    <FormGroup gap={15}>
      {(!isCustomerContext || isEditMode) && (
        <SearchCustomer
          {...register('customerKey', {
            validators: t('projects.customerRequired')
          })}
          hidden={isEditMode || isCustomerContext}
          label={t('common.customer')}
          description={t('projects.customerFieldDescription')}
          required={true}
          placeholder={t('common.searchPlaceholder')}
          selectedKey={model.value('customerKey')}
          onSelected={(customer) => model.set('customerKey', customer?.key)}
        />
      )}
      <ProjectKey />
      <TagPreview hidden={isEditMode} />
      <InputControl
        {...register<InputControlOptions>('name', {
          casing: 'capitalized',
          validators: [{ minLength: 2 }]
        })}
        label={t('common.nameFieldLabel')}
        description={t('projects.nameFieldDescription')}
        required={true}
      />
      <InputControl
        {...register<InputControlOptions>('description', {
          casing: 'capitalized',
          validators: [
            {
              minLength: 10,
              state: 'warning',
              messages: { minLength: t('projects.descriptionWarning') }
            }
          ]
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('projects.descriptionFieldDescription')}
        rows={8}
      />
      <IconPickerControl
        {...register('icon')}
        required
        label={t('common.iconFieldLabel')}
        description={t('projects.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
      />
      <CheckboxControl
        {...register('inactive')}
        label={t('common.inactiveFieldLabel')}
        description={t('projects.inactiveFieldDescription')}
        hidden={!isEditMode}
      />
      <LabelPickerControl
        label={t('common.labelsText')}
        placeholder={t('common.filterLabels')}
        noSelectionText={t('projects.noLabelsSelectedText')}
        defaultSelectedKeys={model.value('labels')}
        onChange={(labels) =>
          model.set(
            'labels',
            labels.map((lbl) => lbl.name)
          )
        }
      />
      <ProjectPickerControl
        {...register('parentKey')}
        hidden={!settings?.enableSimpleHierachy}
        label={t('projects.parentProject')}
        description={t('projects.parentProjectDescription')}
        disabledText={t('projects.parentProjectDisabledText')}
      />
      <CreateOutlookCategory />
    </FormGroup>
  )
}
