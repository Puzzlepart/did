/* eslint-disable unicorn/prevent-abbreviations */
import { Button, mergeClasses, Tag } from '@fluentui/react-components'
import { IListColumn, List } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { getFluentIcon } from 'utils'
import { useUserPickerContext } from '../context'
import { UserMetadataCell } from './UserMetadataCell'
import styles from './SelectedUsersList.module.scss'

export const SelectedUsersList: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  if (context.props.list?.simple) {
    return (
      <div
        className={mergeClasses(
          styles.selectedUsersList,
          context.props.list?.simple && styles.simple
        )}
      >
        {context.state.selectedUsers.map((user) => (
          <Tag
            key={user.id}
            onDoubleClick={() => context.onRemoveUser(user.id)}
            title={t('components.userPicker.removeUserDbClick')}
          >
            {user.displayName}
          </Tag>
        ))}
      </div>
    )
  }
  return (
    <List
      className={styles.selectedUsersList}
      enableShimmer={!context.state.isDataLoaded}
      items={context.state.selectedUsers}
      columns={[
        {
          key: 'displayName',
          fieldName: 'displayName',
          name: t('components.userPicker.displayName'),
          minWidth: 100,
          maxWidth: 180
        },
        ...Object.entries(context.props.additionalMetadata)
          .map(
            ([key, field]) =>
              field &&
              ({
                key,
                fieldName: key,
                name: field.label,
                minWidth: 100,
                maxWidth: 140,
                onRender: (user: User) => (
                  <UserMetadataCell
                    id={key}
                    field={field}
                    user={user}
                    onChange={(value) =>
                      context.onSetAdditionalMetadata({ [key]: value }, user.id)
                    }
                  />
                )
              } as IListColumn)
          )
          .filter(Boolean),
        {
          key: 'actions',
          fieldName: 'actions',
          name: '',
          minWidth: 60,
          maxWidth: 60,
          onRender: (user: User) => (
            <Button
              size='small'
              icon={getFluentIcon('Delete')}
              appearance='subtle'
              onClick={() => context.onRemoveUser(user.id)}
            >
              {t('components.userPicker.removeUser')}
            </Button>
          )
        }
      ]}
      hideEmptyMessage={context.props.hideEmptyMessage}
    />
  )
}
