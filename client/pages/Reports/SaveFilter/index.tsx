import { DefaultButton, TextField } from 'office-ui-fabric'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ADD_FILTER } from '../reducer'
import styles from './SaveFilter.module.scss'
import { ISaveFilterProps } from './types'

export const SaveFilter = ({ state, dispatch }: ISaveFilterProps) => {
    const { t } = useTranslation()
    const [name, setName] = useState(null)
    const [inputVisible, setInputVisible] = useState(false)
    return (
        <div className={styles.root} hidden={state.timeentries.length === state.subset.length || !!state.filter?.name}>
            <div hidden={!inputVisible}>
                <TextField
                    value={name}
                    placeholder={t('reports.filterNamePlaceholder')}
                    onChange={(_, value) => setName(value)} />
            </div>
            <div className={styles.footer}>
                <div className={styles.saveBtn}>
                    <DefaultButton
                        text={t('reports.saveFilterText')}
                        onClick={() => {
                            if (inputVisible) {
                                dispatch(ADD_FILTER({ name }))
                                setName(null)
                            } else {
                                setInputVisible(true)
                            }
                        }}
                    />
                </div>
                <div hidden={!inputVisible}>
                    <DefaultButton
                        className={styles.saveBtn}
                        text={t('reports.cancelSaveFilterText')}
                        onClick={() => setInputVisible(false)} />
                </div>
            </div>
        </div>
    )
}