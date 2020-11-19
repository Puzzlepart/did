import { useMutation } from '@apollo/client'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { MessageBarType, PrimaryButton, TextField, Toggle } from 'office-ui-fabric'
import React, { FunctionComponent, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from 'types'
import { isBlank } from 'underscore.string'
import $createOrUpdateProject from './createOrUpdateProject.gql'
import styles from './ProjectForm.module.scss'
import reducer from './reducer'
import { IProjectFormProps, IProjectFormState, ProjectModel } from './types'
import { validateForm } from './validateForm'

/**
 * Initialize state
 *
 * @param {Project} project Project
 */
const initState = (edit: Project): IProjectFormState => ({
  model: new ProjectModel(edit),
  options: { createOutlookCategory: false },
  editMode: !!edit,
  validation: { errors: {}, invalid: true }
})

export const ProjectForm: FunctionComponent<IProjectFormProps> = ({ edit, onSubmitted }: IProjectFormProps) => {
  const { t } = useTranslation()
  const [message, setMessage] = useMessage()
  const [{ model, validation, options, editMode, projectId }, dispatch] = useReducer(reducer, initState(edit))
  const [createOrUpdateProject, { loading }] = useMutation($createOrUpdateProject)

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(model, t, { nameMinLength: 2 })
    if (_validation.invalid) {
      dispatch({ type: 'SET_VALIDATION', payload: { validation: _validation } })
      return
    }
    const { data } = await createOrUpdateProject({
      variables: {
        project: model,
        options: options,
        update: editMode
      }
    })
    if (data?.result.success) {
      if (editMode && onSubmitted) {
        setTimeout(onSubmitted, 1000)
      } else {
        setMessage({
          text: t('projects.createSuccess', {
            projectId: projectId,
            name: model.name
          }),
          type: MessageBarType.success
        })
        dispatch({ type: 'RESET_FORM' })
      }
    } else {
      setMessage({ text: data?.result.error?.message, type: MessageBarType.error })
    }
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
        onClear={() =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['customerKey', '']
          })
        }
        errorMessage={validation.errors.customerKey}
        onSelected={({ key }) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['customerKey', key]
          })
        }
      />
      <TextField
        disabled={editMode}
        className={styles.inputField}
        label={t('projects.keyFieldLabel')}
        description={t('projects.keyFieldDescription', { keyMaxLength: 8 })}
        required={true}
        errorMessage={validation.errors.projectKey}
        onChange={(_event, value) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['projectKey', value.toUpperCase()]
          })
        }
        value={model.projectKey}
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
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_OPTIONS',
              payload: ['createOutlookCategory', value]
            })
          }
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
        onChange={(_event, value) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['name', value]
          })
        }
        value={model.name}
      />
      <TextField
        className={styles.inputField}
        label={t('common.descriptionFieldLabel')}
        description={t('projects.descriptionFieldDescription')}
        multiline={true}
        errorMessage={validation.errors.description}
        onChange={(_event, value) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['description', value]
          })
        }
        value={model.description}
      />
      <IconPicker
        className={styles.inputField}
        defaultSelected={model.icon}
        label={t('common.iconLabel')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        onSelected={(value) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['icon', value]
          })
        }
      />
      <div className={styles.inputField} hidden={!editMode}>
        <Toggle
          label={t('common.inactiveFieldLabel')}
          checked={model.inactive}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['inactive', value]
            })
          }
        />
        <span className={styles.inputDescription}>{t('projects.inactiveFieldDescription')}</span>
      </div>
      <LabelPicker
        className={styles.inputField}
        label={t('admin.labels')}
        placeholder={t('admin.filterLabels')}
        defaultSelectedKeys={editMode ? edit.labels.map((lbl) => lbl.name) : []}
        onChange={(labels) =>
          dispatch({
            type: 'UPDATE_MODEL',
            payload: ['labels', labels.map((lbl) => lbl.name)]
          })
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
