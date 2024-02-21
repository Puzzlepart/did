import { SearchCustomer } from 'components'
import {
  CheckboxControl,
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  LabelPickerControl
} from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ProjectFormOptions } from './ProjectFormOptions'
import { TagPreview } from './TagPreview'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'
import { useValidateKeyFunction, useValidateUniqueKeyFunction } from './validation'

/**
 * ProjectForm component is used to create and edit projects.
 *
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, options, formControlProps, isCustomerContext } =
    useProjectForm(props)
  const ValidateKeyFunction = useValidateKeyFunction()
  const ValidateUniqueKeyFunction = useValidateUniqueKeyFunction(model.value('customerKey'))
  return (
    <FormControl {...formControlProps}>
      {(!isCustomerContext || !!props.edit) && (
        <SearchCustomer
          {...register('customerKey', {
            validators: t('projects.customerRequired')
          })}
          hidden={!!props.edit || isCustomerContext}
          label={t('common.customer')}
          description={t('projects.customerFieldDescription')}
          required={true}
          placeholder={t('common.searchPlaceholder')}
          selectedKey={model.value('customerKey')}
          onSelected={(customer) => model.set('customerKey', customer?.key)}
        />
      )}
      <InputControl
        {...register<InputControlOptions>('key', {
          casing: 'upper',
          replace: [new RegExp('[^a-zA-Z0-9]'), ''],
          validators: [ValidateKeyFunction, ValidateUniqueKeyFunction]
        })}
        disabled={!!props.edit}
        label={t('projects.keyFieldLabel')}
        description={t('projects.keyFieldDescription', { min: 2, max: 12 })}
        required={!props.edit}
      />
      <TagPreview hidden={!!props.edit} />
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
        label={t('common.iconFieldLabel')}
        description={t('projects.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        required={true}
      />
      <CheckboxControl
        {...register('inactive')}
        label={t('common.inactiveFieldLabel')}
        description={t('projects.inactiveFieldDescription')}
        hidden={!props.edit}
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
      <ProjectFormOptions
        model={model}
        options={options}
        hidden={!!props.edit}
      />
    </FormControl>
  )
}

ProjectForm.displayName = 'ProjectForm'
ProjectForm.defaultProps = {
  refetch: () => {
    // Do nothing if not provided.
  },
  permission: PermissionScope.MANAGE_PROJECTS
}
