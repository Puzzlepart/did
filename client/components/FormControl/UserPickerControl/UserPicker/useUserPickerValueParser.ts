import { IUserPickerProps, IUserPickerState, UserInfo } from './types'
import { useEffect } from 'react'
import _ from 'lodash'

export function useUserPickerValueParser(
  props: IUserPickerProps,
  state: IUserPickerState,
  setState: (newState: React.SetStateAction<Partial<IUserPickerState>>) => void
) {
  useEffect(() => {
    if (_.isEmpty(state.users)) return
    if (props.multiple) {
      if (_.isArray(props.value)) {
        const ids = props.value.map((user) => user.id)
        const selectedUsers = ids
          .map((id, index) => ({
            ...(props.value[index] as UserInfo),
            ...state.users.find((user) => user.id === id)
          }))
          .filter((u) => Boolean(u.displayName))
        setState({ selectedUsers })
      }
    } else {
      if (typeof props.value === 'string') {
        const selectedUser = state.users.find((user) => user.id === props.value)
        setState({ selectedUser })
      }
    }
  }, [state.loading])
}
