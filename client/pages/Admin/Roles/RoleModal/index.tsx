import { useMutation } from '@apollo/react-hooks'
import * as securityConfig from 'config/security'
import { IPermission } from 'interfaces/IPermission'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { contains, omit } from 'underscore'
import styles from './RoleModal.module.scss'
import { IRoleModalProps, UPDATE_ROLE } from './types'

/**
 * @category Admin
 */
export const RoleModal = (props: IRoleModalProps) => {
    const { t } = useTranslation(['admin', 'common'])
    const [updateRole] = useMutation(UPDATE_ROLE)
    const [role, setRole] = React.useState({ ...props.role })
    const permissions = React.useMemo(() => securityConfig.permissions(t), [])

    function togglePermission(permission: IPermission, checked: boolean) {
        const rolePermissions = [...role.permissions]
        const index = rolePermissions.indexOf(permission.id)
        if (checked && index === -1) rolePermissions.push(permission.id)
        else rolePermissions.splice(index, 1)
        setRole({ ...role, permissions: rolePermissions })
    }



    async function onSave() {
        await updateRole({ variables: { role: omit(role, '__typename') } })
        props.onSave(role)
    }

    return (
        <Modal
            {...props.modal}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>
                {t('editRole')}
            </div>
            <div className={styles.container}>
                {permissions.map(pl => (
                    <div key={pl.key} className={styles.permissionItem}>
                        <Toggle
                            label={pl.name}
                            defaultChecked={contains(role.permissions, pl.id)}
                            onChange={(_event, checked) => togglePermission(pl, checked)} />
                    </div>
                ))}
                <PrimaryButton
                   className={styles.saveBtn}
                    text={t('save', { ns: 'common' })}
                    onClick={onSave} />
            </div>
        </Modal>
    )
}

export * from './types'

