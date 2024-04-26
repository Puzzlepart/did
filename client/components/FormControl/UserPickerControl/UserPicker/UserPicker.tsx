import { Combobox, Option, Persona } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import { AddUserButton } from './AddUserButton'
import { AdditionalMetadata } from './AdditionalMetadata'
import { SelectedUsersList } from './SelectedUsersList'
import styles from './UserPicker.module.scss'
import { UserPickerContext } from './context'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'

/**
 * @category Function Component
 */
export const UserPicker: StyledComponent<IUserPickerProps> = (props) => {
  const context = useUserPicker(props)
  return (
    <UserPickerContext.Provider value={context}>
      <div className={UserPicker.className}>
        <Combobox
          disabled={context.state.loading}
          value={context.state.selectedUser?.displayName ?? ''}
          selectedOptions={[context.state.selectedUser?.id].filter(Boolean)}
          placeholder={props.placeholder}
          onOptionSelect={context.onUserSelected}
        >
          <Option text='' value=''></Option>
          {context.selectableUsers.map((user) => (
            <Option key={user.id} text={user.displayName} value={user.id}>
              <Persona
                avatar={{ color: 'colorful', 'aria-hidden': true }}
                name={user.displayName}
                presence={{
                  status: 'unknown'
                }}
                secondaryText={user.jobTitle}
              />
            </Option>
          ))}
        </Combobox>
        {props.multiple && (
          <div>
            <AdditionalMetadata />
            <AddUserButton />
            <SelectedUsersList />
          </div>
        )}
      </div>
    </UserPickerContext.Provider>
  )
}

UserPicker.displayName = 'LabelPicker'
UserPicker.className = styles.userPicker
UserPicker.defaultProps = {
  onChange: () => {
    // Nothing happens on change if not provided.
  },
  additionalMetadata: {}
}
