import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { DefaultButton, TextField } from 'office-ui-fabric'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import $addOrUpdateUserConfiguration from './addOrUpdateUserConfiguration.gql'
import styles from './SaveFilterForm.module.scss'
import { ISaveFilterFormProps } from './types'

export const SaveFilterForm = (props: ISaveFilterFormProps) => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const { state } = useContext(ReportsContext)
    const [addOrUpdateUserConfiguration] = useMutation($addOrUpdateUserConfiguration)
    const [name, setName] = useState(null)
    const [inputVisible, setInputVisible] = useState(false)
    return (
        <div
            className={styles.root}
            style={props?.style}
            hidden={!state.isFiltered || !!state.filter?.name}>
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
                        onClick={async () => {
                            if (inputVisible) {
                                await addOrUpdateUserConfiguration({
                                    variables: {
                                        userId: user.id,
                                        configuration: {
                                            reportFilters: JSON.stringify([])
                                        }
                                    }
                                })
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