
import { AppContext } from 'AppContext'
import { set, get } from 'helpers'
import { PrimaryButton } from 'office-ui-fabric-react'
import { ISliderProps, Slider } from 'office-ui-fabric-react/lib/Slider'
import { ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField'
import { IToggleProps, Toggle } from 'office-ui-fabric-react/lib/Toggle'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SubscriptionSettings.module.scss'
import { SUBSCRIPTION_SETTINGS } from './SUBSCRIPTION_SETTINGS'

export const SubscriptionSettings = () => {
    const { user } = useContext(AppContext)
    const { t } = useTranslation()
    const [settings, setSettings] = useState(user.subscription.settings || {})

    /**
     * On settings changed
     * 
     * @param {string} key Key of setting
     * @param {any} value Value of setting
     */
    const onChange = (key: string, value: any) => {
        const _settings = { ...settings }
        set(_settings, key, value)
        setSettings(_settings)
    }

    return (
        <div className={styles.root}>
            <div className={styles.inputField}>
                <TextField
                    label={t('common.nameLabel')}
                    defaultValue={user.subscription.name} />
            </div>
            {Object.keys(SUBSCRIPTION_SETTINGS(t)).map((section, key) => (
                <div key={key} className={styles.section}>
                    <div className={styles.title}>{section}</div>
                    {SUBSCRIPTION_SETTINGS(t)[section].map(({ key, type, props }) => {
                        switch (type) {
                            case 'bool': {
                                return (
                                    <div className={styles.inputField} key={key}>
                                        <Toggle
                                            {...props as IToggleProps}
                                            defaultChecked={get(user.subscription.settings, key, false)}
                                            onChange={(_event, checked) => onChange(key, checked)} />
                                        <span className={styles.inputDescription}>{props.description}</span>
                                    </div>
                                )
                            }
                            case 'number':
                                {
                                    return (
                                        <div className={styles.inputField} key={key}>
                                            <Slider
                                                {...props as ISliderProps}
                                                defaultValue={get(user.subscription.settings, key, 1)}
                                                onChange={value => onChange(key, value)} />
                                            <span className={styles.inputDescription}>{props.description}</span>
                                        </div>
                                    )
                                }
                            default: {
                                return (
                                    <div className={styles.inputField} key={key}>
                                        <TextField {...props as ITextFieldProps}
                                            onChange={(_event, value) => onChange(key, value)} />
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            ))}
            <PrimaryButton className={styles.saveButton} text={t('common.save')} />
        </div>
    )
}