import { Combobox, Option, Persona } from '@fluentui/react-components'
import { Shimmered } from 'components/Shimmered'
import React from 'react'
import { StyledComponent } from 'types'
import { AddUserButton } from './AddUserButton'
import { AdditionalMetadata } from './AdditionalMetadata'
import { SelectedUsersList } from './SelectedUsersList'
import styles from './UserPicker.module.scss'
import { UserPickerContext } from './context'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'
import { emptyFunction } from 'utils/emptyFunction'

/**
 * @category Function Component
 */
export const UserPicker: StyledComponent<IUserPickerProps> = (props) => {
  const context = useUserPicker(props)
  return (
    <UserPickerContext.Provider value={context}>
      <div className={UserPicker.className}>
        <Shimmered
          isDataLoaded={context.state.isDataLoaded}
          width={250}
          height={30}
        >
          <Combobox
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
        </Shimmered>
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
  onChange: emptyFunction,
  additionalMetadata: {},
  list: {
    allowEdit: true
  }
}
