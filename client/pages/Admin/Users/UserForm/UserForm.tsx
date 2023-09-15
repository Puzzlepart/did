import { Checkbox } from '@fluentui/react-components'
import {
  AutocompleteControl,
  FormControl,
  TextField
} from 'components/FormControl'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { UsersContext } from '../context'
import { RolePicker } from './RolePicker'
import { IUserFormProps } from './types'
import styles from './UserForm.module.scss'
import { useUserForm } from './useUserForm'

export const UserForm: StyledComponent<IUserFormProps> = (props) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const { inputProps, model, setModel, submitProps } = useUserForm(props)

  return (
    <FormControl panelProps={props} submitProps={submitProps}>
      <AutocompleteControl
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
      />
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
        roles={context.state.roles}
        model={model}
        onChanged={(role) => setModel({ ...model, role })}
      />
      <Checkbox
        label={t('admin.userHiddenFromReportsLabel')}
        defaultChecked={model.hiddenFromReports}
        onChange={(_event, data) =>
          setModel({ ...model, hiddenFromReports: data?.checked as boolean })
        }
      />
    </FormControl>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm
