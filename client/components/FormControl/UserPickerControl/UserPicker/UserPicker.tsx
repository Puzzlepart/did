import { Combobox, Option, Persona } from '@fluentui/react-components'
import { DynamicButton } from 'components/DynamicButton'
import { InputField } from 'components/FormControl/InputControl'
import { IListColumn, List } from 'components/List'
import { get } from 'lodash'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './UserPicker.module.scss'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'
import { UserMeadataCell } from './UserMeadataCell'

/**
 * @category Function Component
 */
export const UserPicker: StyledComponent<IUserPickerProps> = (props) => {
  const {
    state,
    selectableUsers,
    onAddUser,
    onUserSelected,
    onSetAdditionalMetadata
  } = useUserPicker(props)

  return (
    <div className={UserPicker.className}>
      <Combobox
        disabled={state.loading}
        value={state.selectedUser?.displayName ?? ''}
        selectedOptions={[state.selectedUser?.id].filter(Boolean)}
        placeholder={props.placeholder}
        onOptionSelect={onUserSelected}
      >
        <Option text='' value=''></Option>
        {selectableUsers.map((user) => (
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
          <div className={styles.additionalMetadata}>
            {Object.keys(props.additionalMetadata).map((key) => (
              <InputField
                hidden={!Boolean(state.selectedUser)}
                key={key}
                name={key}
                label={props.additionalMetadata[key]}
                value={get(state.selectedUser, `additionalMetadata.${key}`, '')}
                onChange={(_, { value }) => onSetAdditionalMetadata(key, value)}
              />
            ))}
          </div>
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
              ...Object.entries(props.additionalMetadata).map(
                ([key, value]) =>
                  ({
                    key,
                    fieldName: key,
                    name: value,
                    minWidth: 100,
                    maxWidth: 120,
                    onRender: (user) => (
                      <UserMeadataCell
                        field={key}
                        user={user}
                        onChange={(value) =>
                          onSetAdditionalMetadata(key, value, user.id)
                        }
                      />
                    )
                  }) as IListColumn
              )
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
  },
  additionalMetadata: {}
}
