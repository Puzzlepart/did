import { useMutation } from '@apollo/client'
import { getIcons } from 'common/icons'
import { IconPicker } from 'components'
import { DefaultButton, TextField } from 'office-ui-fabric'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import $updateUserConfiguration from '../../../graphql/updateUserConfiguration.gql'
import { ReportsContext } from '../context'
import { ADD_FILTER } from '../reducer'
import styles from './SaveFilterForm.module.scss'
import { ISaveFilterFormProps } from './types'
    
const INITIAL_MODEL: IContextualMenuItem = {
    key: '',
    text: '',
    secondaryText: '',
    iconProps: { iconName: first(getIcons(1)) }
}

export const SaveFilterForm = (props: ISaveFilterFormProps) => {
    const { t } = useTranslation()
    const { state, dispatch } = useContext(ReportsContext)
    const [updateUserConfiguration] = useMutation($updateUserConfiguration)
    const [model, setModel] = useState<IContextualMenuItem>(INITIAL_MODEL)
    const [inputVisible, setInputVisible] = useState(false)

    /**
     * On save filter
     * 
     * @note Stringifies the saved filters (including the new one) and sends it to the
     * mutation updateUserConfiguration. 
     * 
     * @returns Promise<void>
     */
    async function onSave(): Promise<void> {
        if (inputVisible) {
            const variables = {
                configuration: JSON.stringify({
                    reports: {
                        filters: [
                            ...state.savedFilters || [],
                            { ...state.filter, ...model }
                        ]
                    }
                })
            }
            await updateUserConfiguration({ variables })
            dispatch(ADD_FILTER({ model }))
            setModel(INITIAL_MODEL)
        } else {
            setInputVisible(true)
        }
    }

    return (
        <div
            className={styles.root}
            style={props?.style}
            hidden={!state.isFiltered || !!state.filter?.text}>
            <div hidden={!inputVisible}>
                <TextField
                    value={model.text}
                    placeholder={t('reports.filterNamePlaceholder')}
                    onChange={(_, text) => setModel({ ...model, text })} />
            </div>
            <div hidden={!inputVisible}>
                <IconPicker
                    defaultSelected={model.iconProps?.iconName}
                    onSelected={iconName => setModel({ ...model, iconProps: { iconName } })} />
            </div>
            <div className={styles.footer}>
                <div className={styles.saveBtn}>
                    <DefaultButton
                        primary={inputVisible}
                        text={t('reports.saveFilterText')}
                        disabled={model.text.length < 4 && inputVisible}
                        onClick={onSave} />
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