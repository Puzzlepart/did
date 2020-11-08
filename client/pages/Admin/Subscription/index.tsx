
import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { useMessage, UserMessage } from 'components'
import { setValue } from 'helpers'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import {  PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscription } from 'types'
import { pick } from 'underscore'
import deepCopy from 'utils/deepCopy'
import omitDeep from 'utils/omitDeep'
import { SUBSCRIPTION_SETTINGS } from './config'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import $updateSubscription from './updateSubscription.gql'

export const SubscriptionSettings = () => {
    const context = useContext(AppContext)
    const { t } = useTranslation()
    const [subscription, setSubscription] = useState<Subscription>(omitDeep(deepCopy(context.subscription), '__typename'))
    const [isSaved, setIsSaved] = useState(false)
    const [updateSubscription] = useMutation($updateSubscription)
    const [message, setMessage] = useMessage()

    const sections = useMemo(() => SUBSCRIPTION_SETTINGS(t), [t])

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
                sections.map((section) => {
                    return (
                        <SettingsSection
                            {...section}
                            key={section.id}
                            defaultExpanded={true}
                            settings={subscription.settings[section.id]}
                            onSettingsChanged={onSettingsChanged} />
                    )
                })
            )}
            <PrimaryButton
                className={styles.saveButton}
                disabled={isSaved}
                onClick={onSaveSettings}
                text={t('common.save')} />
        </div>
    )
}