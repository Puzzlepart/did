import { useMutation } from '@apollo/client'
import { IconPicker } from 'components/IconPicker'
import * as securityConfig from 'config/security'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleInput } from 'types'
import { contains, isEmpty, isEqual, omit } from 'underscore'
import ADD_OR_UPDATE_ROLE from './ADD_OR_UPDATE_ROLE'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'

export const RolePanel: React.FunctionComponent<IRolePanelProps> = (props: IRolePanelProps) => {
    const { t } = useTranslation()
    const [addOrUpdateRole] = useMutation(ADD_OR_UPDATE_ROLE)
    const [model, setModel] = useState<RoleInput>({})
    const permissions = useMemo(() => securityConfig.permissions(t), [])
    const saveDisabled = useMemo(() => (
        isEmpty(model.name)
        ||
        isEmpty(model.icon)
        ||
        isEqual(model.permissions, props.model?.permissions)
    ), [props.model, model])


    useEffect(() => {
        if (props.model) setModel(props.model)
    }, [props.model])

    /**
     * On toggle permission
     * 
     * @param {string} permissionId Permission ID
     * @param {boolean} checked Is checked
     */
    function togglePermission(permissionId: string, checked: boolean) {
        const rolePermissions = [...model.permissions || []]
        const index = rolePermissions.indexOf(permissionId)
        if (checked && index === -1) rolePermissions.push(permissionId)
        else rolePermissions.splice(index, 1)
        setModel({ ...model, permissions: rolePermissions })
    }

    /**
     * On save role
     */
    async function onSave() {
        await addOrUpdateRole({
            variables: {
                role: omit(model, '__typename'),
                update: !!props.model
            }
        })
        props.onSave()
    }

    return (
        <Panel
            className={styles.root}
            customWidth={'440px'}
            isOpen={true}
            title={props.title}
            onDismiss={props.onDismiss}>
            <div className={styles.container}>
                <TextField
                    className={styles.inputField}
                    label={t('admin.roleNameLabel')}
                    defaultValue={props.model ? props.model.name : ''}
                    disabled={!!props.model}
                    required={true}
                    onChange={(_event, name) => setModel({ ...model, name })} />
                <IconPicker
                    label={t('common.iconLabel')}
                    required={true}
                    placeholder={t('common.iconSearchPlaceholder')}
                    defaultSelected={model.icon}
                    onSelected={icon => setModel({ ...model, icon })}
                    className={styles.inputField} />
                <div className={styles.subHeader}>{t('admin.permissonsLabel')}</div>
                <div className={styles.permissions}>
                    {permissions.map(({ key, id, name }) => (
                        <div key={key} className={styles.permissionItem}>
                            <Toggle
                                label={name}
                                inlineLabel={true}
                                defaultChecked={contains(model.permissions, id)}
                                onChange={(_event, checked) => togglePermission(id, checked)} />
                        </div>
                    ))}
                </div>
                <PrimaryButton
                    className={styles.saveBtn}
                    text={t('common.save')}
                    onClick={onSave}
                    disabled={saveDisabled} />
            </div>
        </Panel>
    )
}

export * from './types'

