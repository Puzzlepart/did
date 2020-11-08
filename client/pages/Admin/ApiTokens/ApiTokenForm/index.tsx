import { useMutation } from '@apollo/client'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Panel } from 'office-ui-fabric-react/lib/components/Panel'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useMemo, useState } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { isNull } from 'underscore'
import { isBlank } from 'underscore.string'
import { sleep } from 'utils'
import { moment } from 'utils/date'
import { ApiTokenInput } from '../../../../../server/api/graphql/resolvers/types'
import $addApiToken from './addApiToken.gql'
import styles from './ApiTokenForm.module.scss'
import { IApiTokenFormProps } from './types'
import * as security from 'config/security'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'

export const ApiTokenForm = ({ setMessage, onDismiss }: IApiTokenFormProps) => {
    const { t } = useTranslation()
    const [addApiToken] = useMutation($addApiToken)
    const [token, setToken] = useState<ApiTokenInput>({})
    const [apiKey, setApiKey] = useState(null)
    const permissions = useMemo(() => security.permissions(t).filter(p => p.api), [])

    /**
     * On add API token
     */
    async function onAddApiToken() {
        const { data } = await addApiToken({ variables: { token } })
        if (data.apiKey) {
            setApiKey(data.apiKey)
            setMessage({
                type: MessageBarType.success,
                children: t('admin.tokenGeneratedText'),
            })
            setToken({})
            await sleep(10)
        } else {
            setMessage({
                type: MessageBarType.error,
                text: t('admin.tokenErrorText'),
            })
            setToken({})
            await sleep(5)
        }
        setToken({})
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
                            styles={{ root: { margin: 0 } }} />
                        <div hidden={!description} className={styles.inputDescription}>
                            <span>{description}</span>
                        </div>
                    </div>
                ))}
            </div>
            <DefaultButton
                text={t('common.save')}
                onClick={onAddApiToken}
                disabled={isBlank(token.name) || isNull(token.expires)} />
            {!isNull(apiKey) && (
                <FadeIn className={styles.keyField}>
                    <TextField
                        value={apiKey}
                        multiline={true}
                        disabled={true} />
                </FadeIn>
            )}
        </Panel>
    )
}