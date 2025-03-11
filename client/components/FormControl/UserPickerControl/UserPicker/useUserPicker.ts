/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComboboxProps } from '@fluentui/react-components'
import { useMergedState as useState } from 'hooks'
import _ from 'lodash'
import { IUserPickerProps, IUserPickerState } from './types'
import { useUserPickerQuery } from './useUserPickerQuery'
import { useMemo } from 'react'

export function useUserPicker(props: IUserPickerProps) {
  const { state, setState } = useState<IUserPickerState>({
    isDataLoaded: false,
    users: [],
    selectedUsers: [],
    searchTerm: ''
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
    setState({ selectedUser, searchTerm: '' })
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

  /**
   * Selectable users that can be selected in the `Combobox`.
   * Filters out users that are already selected and users that are not enabled.
   * Also filters out users that do not match the search term - if the `displayName`
   * starts with the search term, it should have precedence over users that have
   * the search term in the middle of their `displayName`.
   */
  const selectableUsers = useMemo(
    () =>
      state.users
        .filter(
          (user) => user.accountEnabled !== false && Boolean(user.displayName))
        .filter(
          (user) => {
            const isSelected = state.selectedUsers.some((u) => u.id === user.id)
            const matchesSearchTerm = user.displayName
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())
            return !isSelected && matchesSearchTerm
          })
        .sort((a, b) => {
          const aStartsWith = a.displayName.toLowerCase().startsWith(state.searchTerm.toLowerCase())
          const bStartsWith = b.displayName.toLowerCase().startsWith(state.searchTerm.toLowerCase())
          if (aStartsWith && !bStartsWith) return -1
          if (!aStartsWith && bStartsWith) return 1
          return 0
        }
        ),
    [state.users, state.selectedUsers, state.searchTerm]
  )

  const onChange: ComboboxProps['onChange'] = (e) => {
    if (!props.freeform) return
    setState({ searchTerm: e.target.value })
  }

  return {
    props,
    state,
    setState,
    selectableUsers,
    onUserSelected,
    onChange,
    onAddUser,
    onRemoveUser,
    onSetAdditionalMetadata
  }
}
