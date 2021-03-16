/* eslint-disable tsdoc/syntax */
import { PermissionList } from 'components/PermissionList'
import { DefaultButton, Icon } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import styles from './Roles.module.scss'

/**
 * Columns hook for Roles
 *
 * @category Roles
 */
export function useColumns({ setPanel }) {
  const { t } = useTranslation()
  return [
    col('name', '', { maxWidth: 150 }, (role: Role) => {
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
      { minWidth: 200, isMultiline: true },
      (role: Role) => <PermissionList permissionIds={role.permissions} />
    ),
    col('edit', null, { maxWidth: 100 }, (role: Role) => (
      <>
        <DefaultButton
          disabled={role.readOnly}
          text={t('common.editLabel')}
          onClick={() =>
            setPanel({
              headerText: t('admin.editRole'),
              model: role
            })
          }
        />
      </>
    ))
  ]
}
