import { PrimaryButton, TextField, Toggle } from '@fluentui/react'
import { Autocomplete, BasePanel } from 'components'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { UsersContext } from '../context'
import { RolePicker } from './RolePicker'
import styles from './UserFormModal.module.scss'
import { IUserFormProps } from './types'
import { useUserForm } from './useUserForm'

export const UserForm: FC<IUserFormProps> = (props) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const { inputProps, model, setModel, isFormValid, onSave } =
    useUserForm(props)

  return (
    <BasePanel
      {..._.omit(props, 'user')}
      className={styles.root}
      isLightDismiss={true}
    >
      {!props.user && (
        <div className={styles.inputContainer}>
          <Autocomplete
            placeholder={t('common.searchPlaceholder')}
            items={context.state.availableAdUsers.map((u) => ({
              key: u.id,
              text: u.displayName,
              searchValue: u.displayName,
              data: u
            }))}
            onSelected={(item) =>
              setModel({
                ...model,
                ...item.data
              })
            }
            onClear={() => setModel({ ...model, id: '', displayName: '' })}
          />
        </div>
      )}
      <TextField
        className={styles.inputContainer}
        {...inputProps({ key: 'surname', label: t('common.surnameLabel') })}
      />
      <TextField
        className={styles.inputContainer}
        {...inputProps({
          key: 'givenName',
          label: t('common.givenNameLabel')
        })}
      />
      <TextField
        className={styles.inputContainer}
        {...inputProps({
          key: 'displayName',
          label: t('common.displayNameLabel')
        })}
      />
      <TextField
        className={styles.inputContainer}
        {...inputProps({
          key: 'jobTitle',
          label: t('common.jobTitleLabel')
        })}
      />
      <RolePicker
        className={styles.inputContainer}
        roles={context.state.roles}
        model={model}
        onChanged={(role) => setModel({ ...model, role })}
      />
      <Toggle
        label={t('admin.userHiddenFromReportsLabel')}
        defaultChecked={model.hiddenFromReports}
        onChange={(_event, hiddenFromReports) =>
          setModel({ ...model, hiddenFromReports })
        }
      />
      <PrimaryButton
        className={styles.saveBtn}
        text={t('common.save')}
        disabled={!isFormValid()}
        onClick={onSave}
      />
    </BasePanel>
  )
}

export * from './types'
