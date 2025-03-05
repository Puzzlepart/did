import {
  AutocompleteControl,
  CheckboxControl,
  DateControl,
  DropdownControl,
  FormControl,
  InputControl
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './UserForm.module.scss'
import { IUserFormProps } from './types'
import { useUserForm } from './useUserForm'

export const UserForm: StyledComponent<IUserFormProps> = (props) => {
  const { t } = useTranslation()
  const {
    formControlProps,
    isEditMode,
    inputProps,
    model,
    register,
    onSelectUser,
    roles,
    availableAdUsers
  } = useUserForm(props)

  return (
    <FormControl {...formControlProps}>
      <AutocompleteControl
        {...register('_' as any, {
          required: !model.value('id') && !isEditMode,
          validators: t('common.adUserRequired')
        })}
        label={t('common.adUserLabel')}
        placeholder={t('common.searchPlaceholder')}
        items={availableAdUsers.map((u) => ({
          key: u.id,
          text: u.displayName,
          searchValue: u.displayName,
          data: u
        }))}
        onSelected={onSelectUser}
        hidden={isEditMode}
      />
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
        values={roles.map((role) => ({
          value: role.name,
          text: role.name
        }))}
        disabled={model.value('isExternal')}
      />
      <DateControl
        {...register('employmentStartDate')}
        label={t('admin.users.employmentStartDateLabel')}
        description={t('admin.users.employmentStartDateDescription')}
        hidden={model.value('isExternal')}
      />
      <DateControl
        {...register('employmentEndDate')}
        label={t('admin.users.employmentEndDateLabel')}
        description={t('admin.users.employmentEndDateDescription')}
        hidden={model.value('isExternal')}
      />
      <CheckboxControl
        {...register('hiddenFromReports')}
        label={t('admin.userHiddenFromReportsLabel')}
        description={t('admin.userHiddenFromReportsDescription')}
        hidden={!isEditMode}
      />
    </FormControl>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm
