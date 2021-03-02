import {PermissionList} from 'components/PermissionList'
import {TFunction} from 'i18next'
import {DefaultButton, Icon} from 'office-ui-fabric-react'
import React from 'react'
import {Role} from 'types'
import {generateColumn as col} from 'utils/generateColumn'
import styles from './Roles.module.scss'

/**
 * Returns the columns for the Role list
 *
 * @param onEdit - On edit callback
 * @param t - Translate function
 */
export const RoleColumns = (onEdit: (role: Role) => void, t: TFunction) => [
  col('name', '', {maxWidth: 100}, (role: Role) => {
    return (
      <div className={styles.nameColumn}>
        <Icon className={styles.icon} iconName={role.icon} />
        <div>{role.name}</div>
      </div>
    )
  }),
  col('description', t('common.descriptionLabel'), {
    maxWidth: 240,
    isMultiline: true
  }),
  col(
    'permissions',
    t('admin.permissonsLabel'),
    {minWidth: 200, isMultiline: true},
    (role: Role) => <PermissionList permissionIds={role.permissions} />
  ),
  col('edit', null, {maxWidth: 100}, (role: Role) => (
    <>
      <DefaultButton
        disabled={role.readOnly}
        text={t('common.editLabel')}
        onClick={() => onEdit(role)}
      />
    </>
  ))
]
