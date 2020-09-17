import { TFunction } from 'i18next'
import { IUser } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React from 'react'
import { generateColumn as col } from 'utils/generateColumn'

export const columns = (onEdit: (user: IUser) => void, t: TFunction): IColumn[] => ([
    col(
        'displayName',
        t('displayNameLabel'),
        { maxWidth: 180 }
    ),
    col(
        'surname',
        t('surnameLabel'),
        { maxWidth: 180 }
    ),
    col(
        'givenName',
        t('givenNameLabel'),
        { maxWidth: 180 }
    ),
    col(
        'jobTitle',
        t('jobTitleLabel'),
        { maxWidth: 180 }
    ),
    col(
        'mail',
        t('mailLabel'),
        { maxWidth: 180 }
    ),
    col(
        'role.name',
        t('roleLabel'),
        {},
        ({ role }: IUser) => {
            return (
                <div>
                    <Icon iconName={role.icon} />
                    <span style={{ marginLeft: 4 }}>{role.name}</span>
                </div>
            )
        }
    ),
    col(
        'actions',
        '',
        {},
        (user: IUser) => (
            <DefaultButton
                text={t('editLabel')}
                onClick={() => onEdit(user)} />
        ))
])