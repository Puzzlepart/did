import { Checkbox } from '@fluentui/react-components'
import { Autocomplete, BasePanel } from 'components'
import { TextField } from 'components/FormControl'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { UsersContext } from '../context'
import { RolePicker } from './RolePicker'
import { IUserFormProps } from './types'
import styles from './UserForm.module.scss'
import { useUserForm } from './useUserForm'

export const UserForm: StyledComponent<IUserFormProps> = (props) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const { inputProps, model, setModel, isFormValid, onSave } =
    useUserForm(props)

  return (
    <BasePanel
      {..._.omit(props, 'user')}
      className={UserForm.className}
      isLightDismiss={true}
      footerActions={[
        {
          appearance: 'primary',
          text: t('common.save'),
          disabled: !isFormValid(),
          onClick: onSave
        }
      ]}
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
        {...inputProps({ key: 'surname', label: t('common.surnameLabel') })}
      />
      <TextField
        {...inputProps({
          key: 'givenName',
          label: t('common.givenNameLabel')
        })}
      />
      <TextField
        {...inputProps({
          key: 'displayName',
          label: t('common.displayNameLabel')
        })}
      />
      <TextField
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
      <div className={styles.inputContainer}>
        <Checkbox
          label={t('admin.userHiddenFromReportsLabel')}
          defaultChecked={model.hiddenFromReports}
          onChange={(_event, data) =>
            setModel({ ...model, hiddenFromReports: data?.checked as boolean })
          }
        />
      </div>
    </BasePanel>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm

export * from './types'
