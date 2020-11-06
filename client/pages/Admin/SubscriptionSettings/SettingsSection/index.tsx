
import { getValue } from 'helpers'
import { Slider } from 'office-ui-fabric-react/lib/Slider'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'
import { Icon } from 'office-ui-fabric-react'

export const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = (props: ISettingsSectionProps) => {
    const { t } = useTranslation()
    const [isExpanded, toggle] = useState(props.defaultExpanded)
    return (
        <div className={styles.root}>
            <div className={styles.header} onClick={() => toggle(!isExpanded)}>
                <div className={styles.title}>{props.name}</div>
                <Icon className={styles.chevron} iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'} />
            </div>
            <div hidden={!isExpanded}>
                {props.fields.map(((field) => {
                    field.props.set(
                        'disabled',
                        field.disabledIf && field.disabledIf(props.settings)
                    )
                    field.props.set(
                        'hidden',
                        field.hiddenIf && field.hiddenIf(props.settings)
                    )
                    const _ = Array.from(field.props).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {} as any)
                    let fieldElement: JSX.Element
                    switch (field.type) {
                        case 'bool':
                            fieldElement = (
                                <Toggle
                                    {..._}
                                    key={field.key}
                                    defaultChecked={getValue(props.settings, field.key, false)} />
                            )
                            break
                        case 'number':
                            fieldElement = <Slider {..._} defaultValue={getValue(props.settings, field.key, 1)} />
                            break
                        default: fieldElement = <TextField {...omit(_, 'descripton')} />
                    }
                    return (
                        <div className={styles.inputField} key={field.key}>
                            {fieldElement}
                            <span className={styles.inputDescription}>{_.description}</span>
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}