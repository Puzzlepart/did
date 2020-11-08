import { useMutation, useQuery } from '@apollo/client'
import { UserMessage } from 'components'
import List from 'components/List'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isBlank } from 'underscore.string'
import { sleep } from 'utils'
import DateUtils from 'utils/date'
import $addApiToken from './addApiToken.gql'
import styles from './ApiTokens.module.scss'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'

export const ApiTokens = () => {
    const { t } = useTranslation()
    const [key, setKey] = useState(null)
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)
    const [addApiToken, { loading }] = useMutation($addApiToken)
    const [deleteApiToken] = useMutation($deleteApiToken)
    const { data, refetch } = useQuery($tokens)

    /**
     * On add API token
     */
    async function onAddApiToken() {
        const { data } = await addApiToken({ variables: { name } })
        if (data.key) {
            setKey(data.key)
            setMessage({
                type: MessageBarType.success,
                children: t('admin.tokenGeneratedText'),
            })
            setName(null)
            refetch()
            await sleep(10)
        } else {
            setMessage({
                type: MessageBarType.error,
                text: t('admin.tokenErrorText'),
            })
            setName(null)
            await sleep(5)
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
            text: t('admin.tokenDeletedText', { name: token.name }),
        })
        setName(null)
        setKey(null)
        refetch()
    }
    

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <TextField
                    placeholder={t('admin.tokenNamePlaceholder')}
                    value={name}
                    onChange={(_event, value) => setName(value)} />
                <DefaultButton
                    text={t('admin.generateTokenLabel')}
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
                        name: t('common.nameFieldLabel'),
                        minWidth: 100,
                        maxWidth: 250,
                    },
                    {
                        key: 'created',
                        fieldName: 'created',
                        name: t('common.createdLabel'),
                        minWidth: 100,
                        onRender: (item) => DateUtils.formatDate(item.created, 'LLL')
                    },
                    {
                        key: 'actions',
                        fieldName: null,
                        name: '',
                        minWidth: 150,
                        onRender: (item) => {
                            return (
                                <DefaultButton
                                    text={t('common.delete')}
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