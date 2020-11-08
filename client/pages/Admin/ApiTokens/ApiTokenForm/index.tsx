import { useMutation } from '@apollo/client'
import * as security from 'config/security'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Panel } from 'office-ui-fabric-react/lib/components/Panel'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contains, isEmpty, isNull } from 'underscore'
import { isBlank } from 'underscore.string'
import { moment } from 'utils/date'
import { ApiTokenInput } from '../../../../../server/api/graphql/resolvers/types'
import $addApiToken from './addApiToken.gql'
import styles from './ApiTokenForm.module.scss'
import { IApiTokenFormProps } from './types'

export const ApiTokenForm = ({ onAdded, onDismiss }: IApiTokenFormProps) => {
    const { t } = useTranslation()
    const [addApiToken] = useMutation($addApiToken)
    const [token, setToken] = useState<ApiTokenInput>({ permissions: [] })
    const permissions = useMemo(() => security.permissions(t).filter(p => p.api), [])

    async function onAddApiToken() {
        const { data } = await addApiToken({ variables: { token } })
        onAdded(data.apiKey)
    }
    
    function togglePermission(permissionId: string, checked: boolean) {
        const permissions = [...token.permissions || []]
        const index = permissions.indexOf(permissionId)
        if (checked && index === -1) permissions.push(permissionId)
        else permissions.splice(index, 1)
        setToken({ ...token, permissions })
    }

    return (
        <Panel
            className={styles.root}
            headerText={t('admin.apiTokens.addNew')}
            isOpen={true}
            onDismiss={onDismiss}>
            <div className={styles.inputContainer}>
                <TextField
                    placeholder={t('admin.apiTokens.tokenNamePlaceholder')}
                    required={true}
                    onChange={(_e, value) => setToken({ ...token, name: value })} />
            </div>
            <div className={styles.inputContainer}>
                <Dropdown
                    placeholder={t('admin.apiTokens.tokenExpiryPlaceholder')}
                    required={true}
                    onChange={(_e, opt) => setToken({ ...token, expires: moment().add(...opt.data).toISOString() })}
                    options={require('./expiryOptions.json')} />
            </div>
            <div className={styles.sectionTitle}>{t('admin.apiTokens.permissionsTitle')}</div>
            <div className={styles.permissions}>
                {permissions.map(({ id, name, description }) => (
                    <div key={id} className={styles.permissionItem}>
                        <Toggle
                            label={name}
                            title={description}
                            inlineLabel={true}
                            styles={{ root: { margin: 0 } }} 
                            defaultChecked={contains(token.permissions, id)}
                            onChange={(_event, checked) => togglePermission(id, checked)}/>
                        <div hidden={!description} className={styles.inputDescription}>
                            <span>{description}</span>
                        </div>
                    </div>
                ))}
            </div>
            <DefaultButton
                text={t('common.save')}
                onClick={onAddApiToken}
                disabled={isBlank(token.name) || !token.expires || isEmpty(token.permissions)} />
        </Panel>
    )
}