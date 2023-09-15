import { IconPicker, LabelPicker, SearchCustomer } from 'components'
import {
  ChecboxControlOptions,
  CheckboxControl,
  FormControl,
  TextControl,
  TextControlOptions
} from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import packageFile from 'package'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ProjectFormOptions } from './ProjectFormOptions'
import { TagPreview } from './TagPreview'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'

/**
 * ProjectForm component is used to create and edit projects.
 *
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, options, formControlProps } = useProjectForm(props)
  return (
    <FormControl {...formControlProps}>
      <SearchCustomer
        hidden={!!props.edit || !!props.customerKey}
        label={t('common.customer')}
        required={true}
        placeholder={t('common.searchPlaceholder')}
        selectedKey={model.value('customerKey')}
        onSelected={(customer) => model.set('customerKey', customer.key)}
      />
      <TextControl
        {...register<TextControlOptions>('key', {
          casing: 'upper',
          replace: [new RegExp('[^a-zA-Z0-9]'), '']
        })}
        disabled={!!props.edit}
        label={t('projects.keyFieldLabel')}
        description={t('projects.keyFieldDescription', packageFile.config.app)}
        required={true}
      />
      <TagPreview hidden={!!props.edit} />
      <TextControl
        {...register<TextControlOptions>('name', { casing: 'capitalized' })}
        label={t('common.nameFieldLabel')}
        description={t('projects.nameFieldDescription', packageFile.config.app)}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('description', {
          casing: 'capitalized'
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('projects.descriptionFieldDescription')}
        rows={8}
      />
      <IconPicker
        name='icon'
        model={model}
        label={t('common.iconFieldLabel')}
        description={t('projects.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        required={true}
      />
      <CheckboxControl
        {...register<ChecboxControlOptions>('inactive')}
        label={t('common.inactiveFieldLabel')}
        description={t('projects.inactiveFieldDescription')}
        hidden={!props.edit}
      />
      <LabelPicker
        label={t('admin.labels.headerText')}
        placeholder={t('projects.filterLabels')}
        headerText={t('projects.applyLabelsHeaderText')}
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

ProjectForm.defaultProps = {
  permission: PermissionScope.MANAGE_PROJECTS
}
