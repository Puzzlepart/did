import * as React from 'react'
import styles from './PermissionList.module.scss'
import { IPermissionListProps } from './types'
import * as securityConfig from 'config/security'
import { useTranslation } from 'react-i18next'
import { contains } from 'underscore'

export const PermissionList = ({ permissionIds }: IPermissionListProps) => {
    const { t } = useTranslation()
    const permissions = React.useMemo(() => {
        return securityConfig.permissions(t).filter(perm => contains(permissionIds, perm.id))
    }, [permissionIds])
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {permissions.map(perm => (
                    <div key={perm.key} className={styles.item}>
                        {perm.name}
                    </div>
                ))}
            </div>
        </div>
    )
}