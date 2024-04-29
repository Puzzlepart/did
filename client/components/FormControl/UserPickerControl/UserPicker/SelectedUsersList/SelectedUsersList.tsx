/* eslint-disable unicorn/prevent-abbreviations */
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserPickerContext } from '../context'
import { IListColumn, List } from 'components'
import { UserMetadataCell } from './UserMetadataCell'
import { User } from 'types'
import { Button } from '@fluentui/react-components'
import { getFluentIcon } from 'utils'

export const SelectedUsersList: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  return (
    <List
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
    />
  )
}
