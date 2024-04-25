import { Combobox, Option, Persona } from '@fluentui/react-components'
import { DynamicButton } from 'components/DynamicButton'
import { List } from 'components/List'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './UserPicker.module.scss'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'

/**
 * @category Function Component
 */
export const UserPicker: StyledComponent<IUserPickerProps> = (props) => {
  const { state, onAddUser, onUserSelected } = useUserPicker(props)

  return (
    <div className={UserPicker.className}>
      <Combobox
        disabled={state.loading}
        defaultValue={state.selectedUser?.displayName ?? ''}
        defaultSelectedOptions={[state.selectedUser?.id].filter(Boolean)}
        placeholder={props.placeholder}
        onOptionSelect={onUserSelected}
      >
        <Option text='' value=''></Option>
        {state.users.map((user) => (
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
          <DynamicButton
            disabled={state.loading || !Boolean(state.selectedUser)}
            className={styles.addButton}
            text='Legg til'
            appearance='primary'
            onClick={onAddUser}
          />
          <List
            enableShimmer={state.loading}
            items={state.selectedUsers}
            columns={[
              {
                key: 'displayName',
                fieldName: 'displayName',
                name: 'Name',
                minWidth: 100,
                maxWidth: 180
              },
              {
                key: 'jobTitle',
                fieldName: 'jobTitle',
                name: 'Job title',
                minWidth: 100
              }
            ]}
          />
        </div>
      )}
    </div>
  )
}

UserPicker.displayName = 'LabelPicker'
UserPicker.className = styles.userPicker
UserPicker.defaultProps = {
  onChange: () => {
    // Nothing happens on change if not provided.
  }
}
