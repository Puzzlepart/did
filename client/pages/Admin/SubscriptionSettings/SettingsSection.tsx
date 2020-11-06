
import { getValue } from 'helpers'
import { Slider } from 'office-ui-fabric-react/lib/Slider'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import styles from './SubscriptionSettings.module.scss'
import { SUBSCRIPTION_SETTINGS } from './SUBSCRIPTION_SETTINGS'
import { ISettingsSectionProps } from './types'

export const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = (props: ISettingsSectionProps) => {
    const { t } = useTranslation()
    return (
        <div className={styles.section}>
            <div className={styles.title}>{props.section}</div>
            {SUBSCRIPTION_SETTINGS(t)[props.section].map(((field) => {
                field.props.set('disabled', field.disabledIf && field.disabledIf(props.settings))
                field.props.set('hidden', field.hiddenIf && field.hiddenIf(props.settings))
                const _ = Array.from(field.props).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {} as any)
                let element = null
                switch (field.type) {
                    case 'bool': {
                        element = (
                            <Toggle
                                {..._}
                                key={field.key}
                                defaultChecked={getValue(props.settings, field.key, false)}
                                onChange={(_event, value) => props.onSettingsChanged(field.key, value)} />
                        )
                    }
                        break
                    case 'number':
                        {
                            element = (
                                <Slider
                                    {..._}
                                    key={field.key}
                                    defaultValue={getValue(props.settings, field.key, 1)}
                                    onChange={(value) => props.onSettingsChanged(field.key, value)} />
                            )
                        }
                        break
                    default: {
                        element = (
                            <TextField
                                {...omit(_, 'descripton')}
                                key={field.key}
                                onChange={(_event, value) => props.onSettingsChanged(field.key, value)} />
                        )
                    }
                }
                return (
                    <div className={styles.inputField} key={field.key}>
                        {element}
                        <span className={styles.inputDescription}>{_.description}</span>
                    </div>
                )
            }))}
        </div>
    )
}