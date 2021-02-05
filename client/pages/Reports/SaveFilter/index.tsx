import { DefaultButton, TextField } from 'office-ui-fabric'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ADD_FILTER } from '../reducer'
import styles from './SaveFilter.module.scss'
import { ISaveFilterProps } from './types'

export const SaveFilter = ({ dispatch }: ISaveFilterProps) => {
    const { t } = useTranslation()
    const [name, setName] = useState(null)
    return (
        <div className={styles.root}>
            <TextField
                placeholder={t('reports.filterNamePlaceholder')}
                onChange={(_, value) => setName(value)}
            />
            <DefaultButton
                className={styles.saveBtn}
                text={t('reports.saveFilterText')}
                onClick={() => {
                    dispatch(ADD_FILTER({ name }))
                    setName(null)
                }}
            />
        </div>
    )
}