import {
  AutocompleteControl,
  CheckboxControl,
  DateControl,
  DropdownControl,
  FormControl,
  InputControl
} from 'components/FormControl'
import { Spinner } from '@fluentui/react-components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent, UserInput } from 'types'
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
    adUsers,
    users,
    adUsersLoading
  } = useUserForm(props)

  // Memoize the set of existing user IDs for O(1) lookup performance
  const existingUserIds = useMemo(() => new Set(users.map((u) => u.id)), [users])

  // Memoize filtered user items to avoid recalculating on every render
  const userItems = useMemo(() => {
    const includeUsersWithoutGivenName = model.value('includeUsersWithoutGivenName' as keyof UserInput)
    const showAlreadyAddedUsers = model.value('showAlreadyAddedUsers' as keyof UserInput)

    // Filter and categorize users
    const availableUsers: any[] = []
    const alreadyAddedUsers: any[] = []

    for (const u of adUsers) {
      // Only process users with valid email
      if (!u.mail) continue
      
      // Skip users without given name unless checkbox is checked
      if (!includeUsersWithoutGivenName && !u.givenName) continue
      
      const isAlreadyAdded = existingUserIds.has(u.id)
      const item = {
        key: u.id,
        text: `${u.displayName} (${u.mail})`,
        secondaryText: isAlreadyAdded ? t('common.userAlreadyAdded') : undefined,
        searchValue: [u.displayName, u.mail].filter(Boolean).join(' '),
        data: u,
        disabled: isAlreadyAdded
      }

      if (isAlreadyAdded) {
        if (showAlreadyAddedUsers) {
          alreadyAddedUsers.push(item)
        }
      } else {
        availableUsers.push(item)
      }
    }

    // Return available users first, then already-added users at the bottom
    return [...availableUsers, ...alreadyAddedUsers]
  }, [adUsers, existingUserIds, model.value('includeUsersWithoutGivenName' as keyof UserInput), model.value('showAlreadyAddedUsers' as keyof UserInput), t])

  return (
    <FormControl {...formControlProps}>
      {!isEditMode && adUsersLoading && (
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Spinner size='tiny' />
          {t('admin.users.loadingActiveDirectoryUsers')}
        </div>
      )}

      <AutocompleteControl
        {...register('_' as any, {
          required: !model.value('id') && !isEditMode,
          validators: t('common.adUserRequired')
        })}
        label={t('common.adUserLabel')}
        placeholder={t('common.searchPlaceholder')}
        items={userItems}
        onSelected={onSelectUser}
        hidden={isEditMode}
        minCharacters={2}
      />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <CheckboxControl
          {...register(('includeUsersWithoutGivenName' as keyof UserInput))}
          label={t('admin.users.includeUsersWithoutGivenName')}
          hidden={isEditMode}
        />
        <CheckboxControl
          {...register(('showAlreadyAddedUsers' as any))}
          label={t('admin.users.showAlreadyAddedUsers')}
          hidden={isEditMode}
        />
      </div>
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
      <CheckboxControl
        {...register('accountEnabled')}
        label={t('common.accountEnabledLabel')}
        description={t('common.accountEnabledDescription')}
        key={'accountEnabled'}
        hidden={!isEditMode}
      />
    </FormControl>
  )
}

UserForm.displayName = 'UserForm'
UserForm.className = styles.userForm
