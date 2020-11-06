
import { useMutation, useQuery } from '@apollo/client'
import { useMessage, UserMessage } from 'components'
import { setValue } from 'helpers'
import { MessageBarType, PrimaryButton } from 'office-ui-fabric-react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscription } from 'types'
import { pick } from 'underscore'
import deepCopy from 'utils/deepCopy'
import omitDeep from 'utils/omitDeep'
import { GET_SUBSCRIPTION } from './GET_SUBSCRIPTION'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import { SUBSCRIPTION_SETTINGS } from './config'
import { UPDATE_SUBSCRIPTION } from './UPDATE_SUBSCRIPTION'

export const SubscriptionSettings = () => {
    const { t } = useTranslation()
    const [subscription, setSubscription] = useState<Subscription>()
    const [isSaved, setIsSaved] = useState(false)
    const { data } = useQuery(GET_SUBSCRIPTION, { skip: !!subscription })
    const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION)
    const [message, setMessage] = useMessage()


    useEffect(() => {
        if (data?.subscription) setSubscription(omitDeep(data.subscription, '__typename'))
    }, [data])
    const onSettingsChanged = (key: string, value: any) => {
        const _subscription = deepCopy(subscription)
        setValue(_subscription, `settings.${key}`, value)
        setSubscription(_subscription)
    }

    const onSaveSettings = async () => {
        await updateSubscription({ variables: pick(subscription, 'id', 'settings') })
        setMessage({ text: t('admin.subscriptionSettingsUpdateSuccess'), type: MessageBarType.success })
        setIsSaved(true)
    }

    return (
        <div className={styles.root}>
            {message && (
                <UserMessage
                    {...message}
                    containerStyle={{
                        marginTop: 12,
                        marginBottom: 12,
                        width: 500
                    }} />
            )}
            <div className={styles.inputField}>
                <TextField
                    disabled
                    label={t('common.nameLabel')}
                    value={subscription?.name} />
            </div>
            {subscription?.settings && (
                Object.keys(SUBSCRIPTION_SETTINGS(t)).map((section, key) => (
                    <SettingsSection
                        key={key}
                        section={section}
                        settings={subscription?.settings}
                        onSettingsChanged={onSettingsChanged} />
                ))
            )}
            <PrimaryButton
                className={styles.saveButton}
                disabled={isSaved}
                onClick={onSaveSettings}
                text={t('common.save')} />
        </div>
    )
}