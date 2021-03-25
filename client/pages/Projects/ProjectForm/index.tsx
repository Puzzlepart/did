/* eslint-disable tsdoc/syntax */
import { Panel, PrimaryButton, TextField, Toggle } from '@fluentui/react'
import {
  ConditionalWrapper,
  IconPicker,
  LabelPicker,
  SearchCustomer,
  TabComponent,
  UserMessage
} from 'components'
import { Toast } from 'components/Toast'
import { config } from 'package'
import React from 'react'
import { LabelObject as Label } from 'types'
import { isBlank } from 'underscore.string'
import styles from './ProjectForm.module.scss'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'

/**
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { state, loading, dispatch, onFormSubmit, toast, t } = useProjectForm({
    props
  })
  return (
    <ConditionalWrapper
      condition={!!props.panel}
      wrapper={(children) => <Panel {...props.panel}>{children}</Panel>}>
      <div className={styles.root}>
        <Toast {...toast} />
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
          description={t('projects.keyFieldDescription', config.app)}
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
            {t('projects.createOutlookCategoryFieldDescription', {
              id: state.projectId
            })}
          </span>
        </div>
        <TextField
          className={styles.inputField}
          label={t('common.nameFieldLabel')}
          description={t('projects.nameFieldDescription', config.app)}
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
          <span className={styles.inputDescription}>
            {t('projects.inactiveFieldDescription')}
          </span>
        </div>
        <LabelPicker
          className={styles.inputField}
          label={t('admin.labels')}
          placeholder={t('admin.filterLabels')}
          defaultSelectedKeys={
            state.editMode
              ? (props.edit.labels as Label[]).map((lbl) => lbl.name)
              : []
          }
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
          disabled={loading || !!toast}
        />
      </div>
    </ConditionalWrapper>
  )
}
