import { useMutation } from '@apollo/client'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { PrimaryButton, Toggle, MessageBarType, TextField } from 'office-ui-fabric'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFormValidation, ProjectOptions } from 'types'
import { isBlank } from 'underscore.string'
import $createOrUpdateProject from './createOrUpdateProject.gql'
import styles from './CreateProjectForm.module.scss'
import { IProjectFormProps, ProjectModel } from './types'

export const ProjectForm = ({ edit, onSubmitted, nameLength = [2] }: IProjectFormProps) => {
  const editMode = !!edit
  const { t } = useTranslation()
  const [validation, setValidation] = useState<IFormValidation>({ errors: {}, invalid: true })
  const [message, setMessage] = useMessage()
  const [project, setProject] = useState<ProjectModel>(new ProjectModel(edit))
  const [options, setOptions] = useState<ProjectOptions>({ createOutlookCategory: false })
  const [createOrUpdateProject, { loading }] = useMutation($createOrUpdateProject)

  /**
   * Update project
   *
   * @param {string} key Key
   * @param {any} value Value
   */
  const updateProject = (key: string, value: any) => {
    const _model = project.clone()
    _model[key] = value
    setProject(_model)
  }

  /**
   * On validate form
   *
   * Checks if customerKey, key and name is valid
   *
   * @param {boolean} checkName Check name property (defaults to true)
   */
  const validateForm = (checkName = true): IFormValidation => {
    const [nameMinLength] = nameLength
    const errors: { [key: string]: string } = {}
    if (!project.customerKey) errors.customerKey = t('projects.customerFormValidationText')
    if (checkName && project.name.length < nameMinLength)
      errors.name = t('projects.nameFormValidationText', { nameMinLength })
    if (!/(^[A-ZÆØÅ0-9]{2,8}$)/gm.test(project.key))
      errors.key = t('projects.keyFormValidationText', { keyMinLength: 2, keyMaxLength: 8 })
    return { errors, invalid: Object.keys(errors).length > 0 }
  }

  const projectId = useMemo(() => {
    return validateForm(false).invalid ? '' : [project.customerKey, project.key].join(' ').toUpperCase()
  }, [project.customerKey, project.key])

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm()
    if (_validation.invalid) {
      setValidation(_validation)
      return
    }
    setValidation({ errors: {}, invalid: false })
    const {
      data: { result }
    } = await createOrUpdateProject({
      variables: {
        project,
        options,
        update: editMode
      }
    })
    if (result.success) {
      if (editMode) {
        if (onSubmitted) setTimeout(onSubmitted, 1000)
      } else {
        setMessage({
          text: t('projects.createSuccess', { projectId, name: project.name }),
          type: MessageBarType.success
        })
        setProject(new ProjectModel())
      }
    } else setMessage({ text: result.error?.message, type: MessageBarType.error })
  }

  return (
    <div className={styles.root}>
      {message && <UserMessage {...message} containerStyle={{ marginTop: 12, marginBottom: 12, width: 550 }} />}
      <SearchCustomer
        hidden={editMode}
        label={t('common.customer')}
        required={true}
        className={styles.inputField}
        placeholder={t('common.searchPlaceholder')}
        onClear={() => updateProject('customerKey', '')}
        errorMessage={validation.errors.customerKey}
        onSelected={(value) => updateProject('customerKey', value?.key)}
      />
      <TextField
        disabled={editMode}
        className={styles.inputField}
        label={t('projects.keyFieldLabel')}
        description={t('projects.keyFieldDescription', { keyMaxLength: 8 })}
        required={true}
        errorMessage={validation.errors.key}
        onChange={(_event, value) => updateProject('key', value.toUpperCase())}
        value={project.key}
      />
      <UserMessage
        hidden={editMode}
        className={styles.idPreviewText}
        iconName='OutlookLogo'
        text={isBlank(projectId) ? t('projects.idPreviewBlankText') : t('projects.idPreviewText', { projectId })}
      />
      <div className={styles.inputField} hidden={editMode}>
        <Toggle
          label={t('projects.createOutlookCategoryFieldLabel')}
          checked={options.createOutlookCategory}
          onChanged={(value) => setOptions({ ...options, createOutlookCategory: value })}
        />
        <span className={styles.inputDescription}>
          {t('projects.createOutlookCategoryFieldDescription', { id: projectId })}
        </span>
      </div>
      <TextField
        className={styles.inputField}
        label={t('common.nameFieldLabel')}
        description={t('projects.nameFieldDescription')}
        required={true}
        errorMessage={validation.errors.name}
        onChange={(_event, value) => updateProject('name', value)}
        value={project.name}
      />
      <TextField
        className={styles.inputField}
        label={t('common.descriptionFieldLabel')}
        description={t('projects.descriptionFieldDescription')}
        multiline={true}
        errorMessage={validation.errors.description}
        onChange={(_event, value) => updateProject('description', value)}
        value={project.description}
      />
      <IconPicker
        className={styles.inputField}
        defaultSelected={project.icon}
        label={t('common.iconLabel')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        onSelected={(value) => updateProject('icon', value)}
      />
      <div className={styles.inputField} hidden={!editMode}>
        <Toggle
          label={t('common.inactiveFieldLabel')}
          checked={project.inactive}
          onChanged={(value) => updateProject('inactive', value)}
        />
        <span className={styles.inputDescription}>{t('projects.inactiveFieldDescription')}</span>
      </div>
      <LabelPicker
        className={styles.inputField}
        label={t('admin.labels')}
        searchLabelText={t('admin.filterLabels')}
        defaultSelectedKeys={editMode ? edit.labels.map((lbl) => lbl.name) : []}
        onChange={(labels) =>
          updateProject(
            'labels',
            labels.map((lbl) => lbl.name)
          )
        }
      />
      <PrimaryButton
        className={styles.inputField}
        text={editMode ? t('common.save') : t('common.add')}
        onClick={onFormSubmit}
        disabled={loading || !!message}
      />
    </div>
  )
}
