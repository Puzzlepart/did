/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComboboxProps } from '@fluentui/react-components'
import { useMergedState } from 'hooks'
import { IUserPickerProps, IUserPickerState } from './types'
import { useUserPickerQuery } from './useUserPickerQuery'

export function useUserPicker(props: IUserPickerProps) {
  const { state, setState } = useMergedState<IUserPickerState>({
    loading: false,
    users: [],
    selectedUsers: []
  })

  useUserPickerQuery(setState)

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
    setState((prevState) => ({
      selectedUser: null,
      selectedUsers: [...prevState.selectedUsers, prevState.selectedUser]
    }))
  }

  return {
    state,
    onUserSelected,
    onAddUser
  }
}
