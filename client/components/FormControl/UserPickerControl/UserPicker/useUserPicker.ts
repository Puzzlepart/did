/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComboboxProps } from '@fluentui/react-components'
import { useMergedState } from 'hooks'
import _ from 'lodash'
import { IUserPickerProps, IUserPickerState } from './types'
import { useUserPickerQuery } from './useUserPickerQuery'

export function useUserPicker(props: IUserPickerProps) {
  const { state, setState } = useMergedState<IUserPickerState>({
    isDataLoaded: false,
    users: [],
    selectedUsers: []
  })

  useUserPickerQuery((users) => {
    const selectedUsers =
      _.isArray(props.value) && props.multiple
        ? props.value.map((value) => ({
            ...value,
            ...users.find((user) => user.id === value.id)
          }))
        : []
    setState({
      users,
      isDataLoaded: true,
      selectedUsers,
      selectedUser:
        typeof props.value === 'string' && !props.multiple
          ? users.find((user) => user.id === props.value)
          : null
    })
  })

  /**
   * Handler for when a user is selected in the `Combobox`. Gets the
   * selected user and sets it in the state. If the `multiple` prop is
   * not set, it will call the `props.onChange` prop with the selected user.
   *
   * @param _ The change event (not used in this function)
   * @param param1 The selected user/option.
   */
  const onUserSelected: ComboboxProps['onOptionSelect'] = (
    _,
    { optionValue }
  ) => {
    const selectedUser = state.users.find((user) => user.id === optionValue)
    setState({ selectedUser })
    if (!props.multiple) {
      props.onChange([selectedUser])
    }
  }

  const onAddUser = () => {
    const newUser = {
      ...state.selectedUser,
      ...state.selectedUser.additionalMetadata
    }
    const selectedUsers = [...state.selectedUsers, newUser]
    props.onChange(selectedUsers)
    setState({ selectedUsers, selectedUser: null })
  }

  /**
   * On set additional metadata for the selected user. If a `userId` is provided,
   * it will set the additional metadata for the user with the provided ID.
   * Otherwise, it will set the additional metadata for the selected user.
   *
   * @param keyValuePairs Key-value pairs of the additional metadata to set.
   * @param userId User ID of the user to set the additional metadata for,
   * if not provided, it will set the additional metadata for the selected user.
   */
  const onSetAdditionalMetadata = (
    keyValuePairs: Record<string, any>,
    userId?: string
  ) => {
    if (userId) {
      const selectedUsers = state.selectedUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            ...keyValuePairs
          }
        }
        return user
      })
      props.onChange(selectedUsers)
      setState({ selectedUsers })
      return
    }
    setState({
      selectedUser: {
        ...state.selectedUser,
        additionalMetadata: {
          ...state.selectedUser.additionalMetadata,
          ...keyValuePairs
        }
      }
    })
  }

  /**
   * Removes a user from the selected users list and triggers the `onChange` event.
   *
   * @param userId - The ID of the user to be removed.
   */
  const onRemoveUser = (userId: string) => {
    const selectedUsers = state.selectedUsers.filter(
      (user) => user.id !== userId
    )
    props.onChange(selectedUsers)
    setState({ selectedUsers })
  }

  const selectableUsers = state.users.filter(
    (user) =>
      !state.selectedUsers.some((u) => u.id === user.id) &&
      user.accountEnabled !== false
  )

  return {
    props,
    state,
    setState,
    selectableUsers,
    onUserSelected,
    onAddUser,
    onRemoveUser,
    onSetAdditionalMetadata
  }
}
