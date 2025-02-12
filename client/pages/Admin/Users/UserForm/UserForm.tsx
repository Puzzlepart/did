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
    isEditMode,
    inputProps,
    model,
    register,
    submitProps,
    onSelectUser,
    roles,
    availableAdUsers
  } = useUserForm(props)

  return (
    <FormControl
      id={UserForm.displayName}
      model={model}
      panel={{
        ...props,
        title: isEditMode
          ? t('admin.users.editUserPanelTitle')
          : t('admin.users.addNewUserPanelTitle'),
        description: isEditMode
          ? t('admin.users.editUserPanelDescription')
          : t('admin.users.addNewUserPanelDescription')
      }}
      submitProps={submitProps}
    >
      {!isEditMode && (
        <AutocompleteControl
          {...register('_' as any, {
            required: !model.value('id'),
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
        values={roles.map((role) => ({
          value: role.name,
          text: role.name
        }))}
      />
      <DateControl
        {...register('employmentStartDate')}
        label={t('admin.users.employmentStartDateLabel')}
        description={t('admin.users.employmentStartDateDescription')}
      />
      <DateControl
        {...register('employmentEndDate')}
        label={t('admin.users.employmentEndDateLabel')}
        description={t('admin.users.employmentEndDateDescription')}
      />
      {isEditMode && (
        <CheckboxControl
          {...register('hiddenFromReports')}
          label={t('admin.userHiddenFromReportsLabel')}
          description={t('admin.userHiddenFromReportsDescription')}
        />
      )}
    </FormControl>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm
