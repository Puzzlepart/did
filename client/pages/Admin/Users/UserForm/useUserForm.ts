import { useAppContext } from 'AppContext'
import {
  IFormControlProps,
  IInputFieldProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import get from 'get-value'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User, UserInput } from 'types'
import _ from 'underscore'
import { useUsersContext } from '../context'
import { RESET_SELECTION } from '../reducer/actions'
import { UserForm } from './UserForm'
import { IUserFormProps, createUserInput } from './types'
import { useRevokeExternalAccess } from './useRevokeExternalAccess'
import { useUserFormSubmit } from './useUserFormSubmit'
import { useLoadAdUsers } from '../BulkImportPanel/useLoadAdUsers'

/**
 * A custom hook that returns the necessary props and functions for the user form.
 *
 * @param props - The props for the user form.
 */
export function useUserForm(props: IUserFormProps) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const context = useUsersContext()
  const initialModel = useMemo(() => createUserInput(props.user), [props.user])
  const model = useFormControlModel<keyof UserInput, UserInput>(initialModel)
  const register = useFormControls<keyof User>(model, UserForm)
  const submitProps = useUserFormSubmit(props, model)
  const revokeExternalAccess = useRevokeExternalAccess(model.value(), () => {
    props.onDismiss()
    context.dispatch(RESET_SELECTION())
  })
  const { loadUsers } = useLoadAdUsers()
  const isEditMode = Boolean(props.user)

  // Automatically load AD users when the form opens in add mode
  useEffect(() => {
    if (
      !isEditMode &&
      context.state.adUsers.length === 0 &&
      !context.state.adUsersLoading
    ) {
      loadUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  const adSyncProperties = get(
    appContext,
    'subscription.settings.adsync.properties',
    { default: [] }
  )

  const inputProps = ({ key, label }): IInputFieldProps => ({
    label,
    description:
      _.contains(adSyncProperties, key) && t('admin.users.userFieldAdSync'),
    disabled: _.contains(adSyncProperties, key)
  })

  /**
   * Callback function that sets the form model with the data of the selected user, or resets the model if no user is selected.
   * Preserves checkbox values (includeUsersWithoutGivenName, showAlreadyAddedUsers) that should persist between searches.
   *
   * @param item The selected user item.
   */
  const onSelectUser = useCallback(
    (item) => {
      // Preserve checkbox values that should persist between searches
      const includeUsersWithoutGivenName = model.value(
        'includeUsersWithoutGivenName' as keyof UserInput
      )
      const showAlreadyAddedUsers = model.value(
        'showAlreadyAddedUsers' as keyof UserInput
      )

      if (item?.data) {
        for (const key in item.data) {
          // Skip setting the checkbox values - they should persist
          if (
            key === 'includeUsersWithoutGivenName' ||
            key === 'showAlreadyAddedUsers'
          ) {
            continue
          }
          model.set(key as any, item.data[key])
        }
      } else {
        // When clearing the input, reset the form but preserve checkbox states
        // Reset all fields from the initial model
        if (initialModel) {
          for (const key in initialModel) {
            // Skip checkbox fields that should persist
            if (
              key === 'includeUsersWithoutGivenName' ||
              key === 'showAlreadyAddedUsers'
            ) {
              continue
            }
            model.set(key as any, initialModel[key])
          }
        } else {
          // If no initial model (new user mode), just clear the form fields
          // but don't use model.reset() as it would clear checkboxes too
          const fields = [
            'displayName',
            'givenName',
            'surname',
            'mail',
            'role',
            'active',
            'manager',
            'entraIdUserId'
          ]
          for (const field of fields) {
            model.set(field as any, null)
          }
        }
      }

      // Always restore the preserved checkbox values
      if (
        includeUsersWithoutGivenName !== null &&
        includeUsersWithoutGivenName !== undefined
      ) {
        model.set(
          'includeUsersWithoutGivenName' as any,
          includeUsersWithoutGivenName
        )
      }
      if (
        showAlreadyAddedUsers !== null &&
        showAlreadyAddedUsers !== undefined
      ) {
        model.set('showAlreadyAddedUsers' as any, showAlreadyAddedUsers)
      }
    },
    [initialModel, model]
  )

  const formControlProps: IFormControlProps = {
    id: UserForm.displayName,
    model,
    register,
    submitProps,
    isEditMode,
    panel: {
      ...props,
      title: isEditMode
        ? t('admin.users.editUserPanelTitle')
        : t('admin.users.addNewUserPanelTitle'),
      description: isEditMode
        ? t('admin.users.editUserPanelDescription')
        : t('admin.users.addNewUserPanelDescription')
    },
    additonalActions: [revokeExternalAccess]
  }

  return {
    isEditMode,
    formControlProps,
    inputProps,
    model,
    register,
    onSelectUser,
    adUsers: context.state.adUsers,
    users: context.state.users,
    adUsersLoading: context.state.adUsersLoading,
    roles: context.state.roles
  }
}
