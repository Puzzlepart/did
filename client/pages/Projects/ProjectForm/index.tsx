/* eslint-disable tsdoc/syntax */
import { Panel, PrimaryButton, TextField, Toggle } from '@fluentui/react'
import {
  ConditionalWrapper,
  IconPicker,
  LabelPicker,
  SearchCustomer,
  SubText,
  TabComponent,
  UserMessage
} from 'components'
import { Toast } from 'components/Toast'
import { config } from 'package'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isBlank } from 'underscore.string'
import styles from './ProjectForm.module.scss'
import { ProjectFormOptions } from './ProjectFormOptions'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'

/**
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, submit, options } = useProjectForm(props)
  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
      <div className={styles.root}>
        <Toast {...submit.toast} />
        <SearchCustomer
          hidden={!!props.edit}
          label={t('common.customer')}
          required={true}
          className={styles.inputField}
          placeholder={t('common.searchPlaceholder')}
          onSelected={(customer) => model.set('customerKey', customer.key)}
        />
        <TextField
          disabled={!!props.edit}
          className={styles.inputField}
          label={t('projects.keyFieldLabel')}
          description={t('projects.keyFieldDescription', config.app)}
          required={true}
          onChange={(_event, value) => model.set('key', value.toUpperCase())}
          value={model.value('key')}
        />
        <UserMessage
          hidden={!!props.edit}
          containerStyle={{ marginTop: 10 }}
          iconName='OutlookLogo'
          text={
            isBlank(model.value('key'))
              ? t('projects.idPreviewBlankText')
              : t('projects.idPreviewText', model)
          }
        />
        <TextField
          className={styles.inputField}
          label={t('common.nameFieldLabel')}
          description={t('projects.nameFieldDescription', config.app)}
          required={true}
          onChange={(_event, value) => model.set('name', value)}
          value={model.value('name')}
        />
        <TextField
          className={styles.inputField}
          label={t('common.descriptionFieldLabel')}
          description={t('projects.descriptionFieldDescription')}
          multiline={true}
          autoAdjustHeight={true}
          onChange={(_event, value) => model.set('description', value)}
          value={model.value('description')}
        />
        <IconPicker
          className={styles.inputField}
          defaultSelected={model.value('icon')}
          label={t('common.iconFieldLabel')}
          description={t('projects.iconFieldDescription')}
          placeholder={t('common.iconSearchPlaceholder')}
          width={300}
          required={true}
          onSelected={(value) => model.set('icon', value)}
        />
        <div className={styles.inputField} hidden={!props.edit}>
          <Toggle
            label={t('common.inactiveFieldLabel')}
            checked={model.value('inactive')}
            onChange={(_event, value) => model.set('inactive', value)}
          />
          <SubText text={t('projects.inactiveFieldDescription')} />
        </div>
        <LabelPicker
          className={styles.inputField}
          label={t('admin.labels')}
          placeholder={t('admin.filterLabels')}
          defaultSelectedKeys={[]}
          onChange={(labels) => model.set('labels', labels.map((lbl) => lbl.name))}
        />
        <ProjectFormOptions
          model={model}
          options={options}
          hidden={!!props.edit} />
        <PrimaryButton
          className={styles.inputField}
          text={!!props.edit ? t('common.save') : t('common.add')}
          onClick={submit.onClick}
          disabled={submit.disabled}
        />
      </div>
    </ConditionalWrapper>
  )
}
