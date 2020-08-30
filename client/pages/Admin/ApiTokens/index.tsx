import { useMutation, useQuery } from '@apollo/react-hooks'
import delay from 'delay'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ADD_API_TOKEN from './ADD_API_TOKEN'
import styles from './ApiTokens.module.scss'
import GET_API_TOKENS from './GET_API_TOKENS'
import List from 'components/List'
import { isBlank } from 'underscore.string'
import dateUtils from 'utils/date'
import DELETE_API_TOKEN from './DELETE_API_TOKEN'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import { UserMessage } from 'components'

/**
 * @category Admin
 */
export const ApiTokens = () => {
    const { t } = useTranslation('admin')
    const [key, setKey] = useState(null)
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)
    const [addApiToken, { loading }] = useMutation(ADD_API_TOKEN)
    const [deleteApiToken] = useMutation(DELETE_API_TOKEN)
    const { data, refetch } = useQuery(GET_API_TOKENS)

    /**
     * On add API token
     */
    async function onAddApiToken() {
        const { data } = await addApiToken({ variables: { name } })
        if (data.key) {
            setKey(data.key)
            setMessage({
                type: MessageBarType.success,
                children: t('tokenGeneratedText'),
            })
            setName(null)
            refetch()
            await delay(10000)
        } else {
            setMessage({
                type: MessageBarType.error,
                text: t('tokenErrorText'),
            })
            setName(null)
            await delay(5000)
        }
        setKey(null)
        setMessage(null)
    }

    /**
     * On delete API token
     * 
     * @param token The token to dete 
     */
    async function onDeleteApiToken(token) {
        await deleteApiToken({ variables: { name: token.name } })
        setMessage({
            type: MessageBarType.info,
            text: format(t('tokenDeletedText'), token.name),
        })
        setName(null)
        setKey(null)
        refetch()
    }

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <TextField
                    placeholder={t('tokenNamePlaceholder')}
                    value={name}
                    onChange={(_event, value) => setName(value)} />
                <DefaultButton
                    text={t('generateTokenLabel')}
                    onClick={onAddApiToken}
                    disabled={loading || !!key || isBlank(name)} />
            </div>
            {message && (
                <UserMessage
                    className={styles.message}
                    {...message}
                    iconName='AzureAPIManagement' />
            )}
            <TextField
                className={styles.field}
                value={key}
                multiline={true}
                disabled={true} />
            <List
                columns={[
                    {
                        key: 'name',
                        fieldName: 'name',
                        name: t('nameLabel', { ns: 'common' }),
                        minWidth: 100,
                        maxWidth: 250,
                    },
                    {
                        key: 'timestamp',
                        fieldName: 'timestamp',
                        name: t('createdLabel', { ns: 'common' }),
                        minWidth: 100,
                        onRender: (item) => dateUtils.formatDate(item.timestamp, 'LLL')
                    },
                    {
                        key: 'actions',
                        fieldName: null,
                        name: '',
                        minWidth: 150,
                        onRender: (item) => {
                            return (
                                <DefaultButton
                                    text={t('delete', { ns: 'common' })}
                                    iconProps={{ iconName: 'RecycleBin' }}
                                    onClick={() => onDeleteApiToken(item)} />
                            )
                        }
                    }
                ]}
                items={data?.tokens || []} />
        </div>
    )
}