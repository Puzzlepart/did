import { useAppContext } from 'AppContext'
import {
  IFormControlProps,
  IInputFieldProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import get from 'get-value'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User, UserInput } from 'types'
import _ from 'underscore'
import { useUsersContext } from '../context'
import { RESET_SELECTION } from '../reducer/actions'
import { UserForm } from './UserForm'
import { IUserFormProps, createUserInput } from './types'
import { useRevokeExternalAccess } from './useRevokeExternalAccess'
import { useUserFormSubmit } from './useUserFormSubmit'

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
  const revokeExternalAccess = useRevokeExternalAccess(
    model.value(),
    () => {
      props.onDismiss()
      context.dispatch(RESET_SELECTION())
    }
  )

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
   *
   * @param item The selected user item.
   */
  const onSelectUser = useCallback((item) => {
    if (item?.data) {
      for (const key in item.data) {
        model.set(key as any, item.data[key])
      }
    } else {
      model.reset()
    }
  }, [])

  const isEditMode = Boolean(props.user)

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
    ...context.state
  }
}
