import {
  AutocompleteControl,
  CheckboxControl,
  DropdownControl,
  FormControl,
  InputControl
} from 'components/FormControl'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { UsersContext } from '../context'
import { IUserFormProps } from './types'
import styles from './UserForm.module.scss'
import { useUserForm } from './useUserForm'

export const UserForm: StyledComponent<IUserFormProps> = (props) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const { isEditMode, inputProps, model, register, submitProps, onSelectUser } =
    useUserForm(props)

  return (
    <FormControl
      model={model}
      panelProps={{ ...props, scroll: true }}
      submitProps={submitProps}
    >
      {!isEditMode && (
        <AutocompleteControl
          {...register('_' as any, {
            validators: t('common.adUserRequired')
          })}
          required={true}
          label={t('common.adUserLabel')}
          placeholder={t('common.searchPlaceholder')}
          items={context.state.availableAdUsers.map((u) => ({
            key: u.id,
            text: u.displayName,
            searchValue: u.displayName,
            data: u
          }))}
          onSelected={onSelectUser}
        />
      )}
      <InputControl
        {...register('surname')}
        {...inputProps({ key: 'surname', label: t('common.surnameLabel') })}
      />
      <InputControl
        {...register('givenName')}
        {...inputProps({
          key: 'givenName',
          label: t('common.givenNameLabel')
        })}
      />
      <InputControl
        {...register('displayName')}
        {...inputProps({
          key: 'displayName',
          label: t('common.displayNameLabel')
        })}
      />
      <InputControl
        {...register('jobTitle')}
        {...inputProps({
          key: 'jobTitle',
          label: t('common.jobTitleLabel')
        })}
      />
      <DropdownControl
        {...register('role')}
        label={t('common.roleLabel')}
        defaultValue='User'
        values={context.state.roles.map((role) => ({
          value: role.name,
          text: role.name
        }))}
      />
      <CheckboxControl
        {...register('hiddenFromReports')}
        label={t('admin.userHiddenFromReportsLabel')}
        description={t('admin.userHiddenFromReportsDescription')}
      />
    </FormControl>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm
