import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks/lib/useMutation'
import ADD_API_TOKEN from './ADD_API_TOKEN'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import styles from './ApiTokens.module.scss'
import { useTranslation } from 'react-i18next'
import delay from 'delay'

/**
 * @category Admin
 */
export const ApiTokens = () => {
    const { t } = useTranslation('admin')
    const [key, setKey] = useState(null)
    const [addApiToken, { loading }] = useMutation(ADD_API_TOKEN)

    async function onAddApiToken() {
        const { data } = await addApiToken()
        setKey(data.key)
        await delay(10000)
        setKey(null)
    }

    return (
        <div className={styles.root}>
            <DefaultButton
                text={t('generateTokenLabel')}
                onClick={onAddApiToken}
                disabled={loading || !!key} />
            {key && (
                <MessageBar
                    className={styles.message}
                    messageBarType={MessageBarType.success}
                    messageBarIconProps={{ iconName: 'AzureAPIManagement' }}>
                    {t('tokenGeneratedText')}
                </MessageBar>
            )}
            <TextField
                className={styles.field}
                value={key}
                multiline={true}
                disabled={true} />
        </div>
    )
}