import { TFunction } from 'i18next'
import { IUser } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import React from 'react'
import { generateColumn as col } from 'utils/generateColumn'

export const columns = (onEdit: (user: IUser) => void, t: TFunction): IColumn[] => ([
    col(
        'role.name',
        t('common.roleLabel'),
        { maxWidth: 100 },
        ({ role }: IUser) => role.name,
    ),
    col(
        'displayName',
        t('common.displayNameLabel'),
        { maxWidth: 180 }
    ),
    col(
        'surname',
        t('common.surnameLabel'),
        { maxWidth: 160 }
    ),
    col(
        'givenName',
        t('common.givenNameLabel'),
        { maxWidth: 160 }
    ),
    col(
        'jobTitle',
        t('common.jobTitleLabel'),
        { maxWidth: 140 }
    ),
    col(
        'mail',
        t('common.mailLabel'),
        { maxWidth: 180 }
    ),
    col(
        'actions',
        '',
        {},
        (user: IUser) => (
            <DefaultButton
                text={t('common.editLabel')}
                onClick={() => onEdit(user)} />
        ))
])