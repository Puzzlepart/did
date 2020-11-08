import { useMutation } from '@apollo/client'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
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

export const ApiTokenForm = (props: IApiTokenFormProps) => {
    const { t } = useTranslation()
    const [addApiToken, { loading }] = useMutation($addApiToken)
    const [token, setToken] = useState<ApiTokenInput>({})
    const [apiKey, setApiKey] = useState(null)

    /**
     * On add API token
     */
    async function onAddApiToken() {
        const { data } = await addApiToken({ variables: { token } })
        if (data.apiKey) {
            setApiKey(data.apiKey)
            props.setMessage({
                type: MessageBarType.success,
                children: t('admin.tokenGeneratedText'),
            })
            setToken({})
            await sleep(10)
        } else {
            props.setMessage({
                type: MessageBarType.error,
                text: t('admin.tokenErrorText'),
            })
            setToken({})
            await sleep(5)
        }
        setToken({})
    }

    // eslint-disable-next-line no-console
    console.log(token)

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <TextField
                    placeholder={t('admin.tokenNamePlaceholder')}
                    onChange={(_e, value) => setToken({ ...token, name: value })} />
                <Dropdown
                    placeholder={t('admin.tokenExpiryPlaceholder')}
                    required={true}
                    onChange={(_e, opt) => setToken({ ...token, expires: moment().add(...opt.data).toISOString() })}
                    options={require('./expiryOptions.json')}
                    className={styles.expiresField} />
                <DefaultButton
                    text={t('admin.generateTokenLabel')}
                    onClick={onAddApiToken}
                    styles={{ root: { marginLeft: 8 } }}
                    disabled={isBlank(token.name) || isNull(token.expires)} />
            </div>
            {!isNull(apiKey) && (
                <FadeIn className={styles.keyField}>
                    <TextField
                        value={apiKey}
                        multiline={true}
                        disabled={true} />
                </FadeIn>
            )}
        </div>
    )
}