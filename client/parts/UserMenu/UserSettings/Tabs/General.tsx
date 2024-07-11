import { useAppContext } from 'AppContext'
import {
    DropdownControl
} from 'components'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEYS } from '../types'
import { UserSettingsTabComponent } from './types'
import styles from './UserSettingsTabComponent.module.scss'

export const General: UserSettingsTabComponent = ({ register }) => {
    const { t } = useTranslation()
    const { pages } = useAppContext()
    const [, hasPermission] = usePermissions()
    return (
        <div className={styles.container}>
            <DropdownControl
                {...register(CONFIG_KEYS.startPage)}
                label={t('common.startPageLabel')}
                values={[
                    {
                        value: '/',
                        text: t('common.homePage')
                    },
                    ...pages
                        .filter(
                            ({ permission }) => permission && hasPermission(permission)
                        )
                        .map(({ text, path: value }) => ({
                            value,
                            text
                        }))
                ]}
            />
            <DropdownControl
                {...register(CONFIG_KEYS.preferredLanguage)}
                label={t('common.preferredLanguageLabel')}
                values={[
                    {
                        value: 'en-GB',
                        text: 'English (United Kingdom)'
                    },
                    {
                        value: 'nb',
                        text: 'Norsk (bokmål)'
                    },
                    {
                        value: 'nn',
                        text: 'Norsk (nynorsk)'
                    }
                ]}
            />
            <DropdownControl
                {...register(CONFIG_KEYS.theme)}
                label={t('common.uiThemeLabel')}
                values={[
                    {
                        value: 'default',
                        text: t('common.light-theme')
                    },
                    {
                        value: 'dark',
                        text: t('common.dark-theme')
                    },
                    {
                        value: 'auto',
                        text: t('common.auto-theme')
                    }
                ]}
            />
        </div>
    )
}