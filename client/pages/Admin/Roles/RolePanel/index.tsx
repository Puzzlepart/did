import { useMutation } from '@apollo/react-hooks'
import * as securityConfig from 'config/security'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { contains, omit, isEmpty } from 'underscore'
import styles from './RolePanel.module.scss'
import { IRolePanelProps, UPDATE_ROLE, ADD_ROLE } from './types'

/**
 * @category Admin
 */
export const RolePanel = (props: IRolePanelProps) => {
    const { t } = useTranslation('admin')
    const [[addRole], [updateRole]] = [useMutation(ADD_ROLE), useMutation(UPDATE_ROLE)]
    const [role, setRole] = React.useState(props.edit || { permissions: [] })
    const permissions = React.useMemo(() => securityConfig.permissions(t), [])

    function togglePermission(permissionId: string, checked: boolean) {
        const rolePermissions = [...role.permissions]
        const index = rolePermissions.indexOf(permissionId)
        if (checked && index === -1) rolePermissions.push(permissionId)
        else rolePermissions.splice(index, 1)
        setRole({ ...role, permissions: rolePermissions })
    }

    async function onSave() {
        if (props.edit) await updateRole({ variables: { role: omit(role, '__typename') } })
        else await addRole({ variables: { role: omit(role, '__typename') } })
        props.onSave(role)
    }

    return (
        <Panel
            className={styles.root}
            isOpen={true}
            title={props.title}
            onDismiss={props.onDismiss}>
            <div className={styles.container}>
                <div className={styles.inputField}>
                    <TextField
                        label={t('roleNameLabel')}
                        defaultValue={props.edit ? props.edit.name : ''}
                        disabled={!!props.edit}
                        required={true}
                        onChange={(_event, name) => setRole({ ...role, name })} />
                </div>
                <div className={styles.subHeader}>{t('permissonsLabel')}</div>
                <div className={styles.permissions}>
                    {permissions.map(({ key, id, name }) => (
                        <div key={key} className={styles.permissionItem}>
                            <Toggle
                                label={name}
                                defaultChecked={contains(role.permissions, id)}
                                onChange={(_event, checked) => togglePermission(id, checked)} />
                        </div>
                    ))}
                </div>
                <PrimaryButton
                    className={styles.saveBtn}
                    text={t('save', { ns: 'common' })}
                    onClick={onSave}
                    disabled={!props.edit && isEmpty(role.name)} />
            </div>
        </Panel>
    )
}

export * from './types'

