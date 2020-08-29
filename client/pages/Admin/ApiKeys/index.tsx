import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks/lib/useMutation'
import { ADD_API_KEY } from './ADD_API_KEY'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import styles from './ApiKeys.module.scss'

/**
 * @category Admin
 */
export const ApiKeys = () => {
    const [key, setKey] = useState('')
    const [addApiKey, { loading }] = useMutation(ADD_API_KEY)

    async function onAddApiKey() {
        const { data } = await addApiKey()
        setKey(data.key)
    }

    return (
        <div className={styles.root}>
            <DefaultButton
            className={styles.button}
                text='Generate API key'
                onClick={onAddApiKey}
                disabled={loading || !!key} />
            {key && (
                <MessageBar 
                className={styles.message}
                messageBarType={MessageBarType.success} 
                messageBarIconProps={{ iconName: 'AzureAPIManagement' }}>
                    Your key has been generated. You can only see it once. Take good care of it!
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