/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Toggle } from '@fluentui/react'
import {
  IconPicker,
  LabelPicker,
  SearchCustomer,
  SubText,
  TabComponent
} from 'components'
import { FormControl } from 'components/FormControl'
import { TextControl } from 'components/FormControl/TextControl'
import { TextControlOptions } from 'components/FormControl/TextControl/types'
import packageFile from 'package'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectFormOptions } from './ProjectFormOptions'
import { TagPreview } from './TagPreview'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'

/**
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, submit, register, options } = useProjectForm(props)
  return (
    <FormControl {...props} submitProps={submit}>
      <SearchCustomer
        hidden={!!props.edit}
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
      <TagPreview hidden={!!props.edit} projectId={model.projectId} />
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
        multiline={true}
        autoAdjustHeight={true}
        rows={14}
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
      <div hidden={!props.edit}>
        <Toggle
          label={t('common.inactiveFieldLabel')}
          checked={model.value('inactive')}
          onChange={(_event, value) => model.set('inactive', value)}
        />
        <SubText text={t('projects.inactiveFieldDescription')} />
      </div>
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
