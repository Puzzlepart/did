import { DefaultButton, TextField } from 'office-ui-fabric'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { ADD_FILTER } from '../reducer'
import styles from './SaveFilterForm.module.scss'

export const SaveFilterForm = () => {
    const { t } = useTranslation()
    const { dispatch, state } = useContext(ReportsContext)
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