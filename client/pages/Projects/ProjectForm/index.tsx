import { useMutation } from '@apollo/client'
import AppConfig from 'AppConfig'
import { IconPicker, LabelPicker, SearchCustomer, useMessage, UserMessage } from 'components'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { MessageBarType, Panel, PrimaryButton, TextField, Toggle } from 'office-ui-fabric'
import React, { FunctionComponent, useContext, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label } from 'types'
import { isBlank } from 'underscore.string'
import { ProjectsContext } from '../context'
import $createOrUpdateProject from './createOrUpdateProject.gql'
import styles from './ProjectForm.module.scss'
import reducer, { initState } from './reducer'
import { IProjectFormProps } from './types'
import { validateForm } from './validateForm'

export const ProjectForm: FunctionComponent<IProjectFormProps> = (props: IProjectFormProps) => {
  const { t } = useTranslation()
  const context = useContext(ProjectsContext)
  const [message, setMessage] = useMessage()
  const [state, dispatch] = useReducer(reducer, initState(props.edit))
  const [createOrUpdateProject, { loading }] = useMutation($createOrUpdateProject)

  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(state.model, t)
    if (_validation.invalid) {
      dispatch({ type: 'SET_VALIDATION', payload: { validation: _validation } })
      return
    }
    const { data } = await createOrUpdateProject({
      variables: {
        project: state.model,
        options: state.options,
        update: state.editMode
      }
    })
    if (data?.result.success) {
      if (props.panel) setTimeout(() => props.panel.onSave(), 1000)
      else {
        setMessage({
          text: t('projects.createSuccess', {
            projectId: state.projectId,
            name: state.model.name
          }),
          type: MessageBarType.success
        })
        dispatch({ type: 'RESET_FORM' })
        context.refetch()
      }
    } else {
      setMessage({ text: data?.result.error?.message, type: MessageBarType.error })
    }
  }

  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
      <div className={styles.root}>
        {message && (
          <UserMessage
            {...message}
            containerStyle={{ marginTop: 12, marginBottom: 12, width: 550 }}
          />
        )}
        <SearchCustomer
          hidden={state.editMode}
          label={t('common.customer')}
          required={true}
          className={styles.inputField}
          placeholder={t('common.searchPlaceholder')}
          errorMessage={state.validation.errors.customerKey}
          onSelected={(customer) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['customerKey', customer?.key]
            })
          }
        />
        <TextField
          disabled={state.editMode}
          className={styles.inputField}
          label={t('projects.keyFieldLabel')}
          description={t('projects.keyFieldDescription', AppConfig)}
          required={true}
          errorMessage={state.validation.errors.key}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['key', value.toUpperCase()]
            })
          }
          value={state.model.key}
        />
        <UserMessage
          hidden={state.editMode}
          className={styles.idPreviewText}
          iconName='OutlookLogo'
          text={
            isBlank(state.projectId)
              ? t('projects.idPreviewBlankText')
              : t('projects.idPreviewText', { id: state.projectId })
          }
        />
        <div className={styles.inputField} hidden={state.editMode}>
          <Toggle
            label={t('projects.createOutlookCategoryFieldLabel')}
            checked={state.options.createOutlookCategory}
            onChange={(_event, value) =>
              dispatch({
                type: 'UPDATE_OPTIONS',
                payload: ['createOutlookCategory', value]
              })
            }
          />
          <span className={styles.inputDescription}>
            {t('projects.createOutlookCategoryFieldDescription', { id: state.projectId })}
          </span>
        </div>
        <TextField
          className={styles.inputField}
          label={t('common.nameFieldLabel')}
          description={t('projects.nameFieldDescription', AppConfig)}
          required={true}
          errorMessage={state.validation.errors.name}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['name', value]
            })
          }
          value={state.model.name}
        />
        <TextField
          className={styles.inputField}
          label={t('common.descriptionFieldLabel')}
          description={t('projects.descriptionFieldDescription')}
          errorMessage={state.validation.errors.description}
          multiline={true}
          autoAdjustHeight={true}
          onChange={(_event, value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['description', value]
            })
          }
          value={state.model.description}
        />
        <IconPicker
          className={styles.inputField}
          defaultSelected={state.model.icon}
          label={t('common.iconFieldLabel')}
          description={t('projects.iconFieldDescription')}
          placeholder={t('common.iconSearchPlaceholder')}
          width={300}
          onSelected={(value) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['icon', value]
            })
          }
        />
        <div className={styles.inputField} hidden={!state.editMode}>
          <Toggle
            label={t('common.inactiveFieldLabel')}
            checked={state.model.inactive}
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
          defaultSelectedKeys={state.editMode ? (props.edit.labels as Label[]).map((lbl) => lbl.name) : []}
          onChange={(labels) =>
            dispatch({
              type: 'UPDATE_MODEL',
              payload: ['labels', labels.map((lbl) => lbl.name)]
            })
          }
        />
        <PrimaryButton
          className={styles.inputField}
          text={state.editMode ? t('common.save') : t('common.add')}
          onClick={onFormSubmit}
          disabled={loading || !!message}
        />
      </div>
    </ConditionalWrapper>
  )
}
