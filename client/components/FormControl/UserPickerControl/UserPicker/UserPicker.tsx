import { Combobox, Option, Persona } from '@fluentui/react-components'
import { Shimmered } from 'components/Shimmered'
import React from 'react'
import { StyledComponent } from 'types'
import { emptyFunction } from 'utils/emptyFunction'
import { AddUserButton } from './AddUserButton'
import { AdditionalMetadata } from './AdditionalMetadata'
import { FreeformOption } from './FreeformOption'
import { SelectedUsersList } from './SelectedUsersList'
import styles from './UserPicker.module.scss'
import { UserPickerContext } from './context'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'
import { DynamicButton } from 'components/DynamicButton'
import _ from 'underscore'

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
          width={300}
          height={30}
        >
          <Combobox
            style={props.fullWidth ? { width: '100%' } : {}}
            value={context.state.selectedUser?.displayName ?? ''}
            selectedOptions={[context.state.selectedUser?.id].filter(Boolean)}
            placeholder={props.placeholder}
            onOptionSelect={context.onUserSelected}
            onChange={context.onChange}
            input={
              context.state.searchTerm
                ? {
                    value: context.state.searchTerm
                  }
                : {}
            }
            freeform={props.freeform}
          >
            <FreeformOption />
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
            <div className={styles.actions}>
              <AddUserButton />
              {props.customAction && (
                <DynamicButton
                  {...(_.isFunction(props.customAction)
                    ? props.customAction(context.state)
                    : props.customAction)}
                />
              )}
            </div>
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
