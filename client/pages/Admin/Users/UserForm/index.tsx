import { useMutation } from '@apollo/react-hooks'
import { Autocomplete } from 'components'
import { IUser } from 'interfaces'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { find, omit, pick } from 'underscore'
import validator from 'validator'
import { UsersContext } from '../UsersContext'
import ADD_OR_UPDATE_USER, { IAddOrUpdateUserVariables } from './ADD_OR_UPDATE_USER'
import { IUserFormProps } from './types'
import styles from './UserFormModal.module.scss'

/**
 * @category Admin
 */
export const UserForm = (props: IUserFormProps) => {
    const { adUsers, roles } = useContext(UsersContext)
    const { t } = useTranslation()
    const [model, setModel] = useState<IUser>(props.user || {
        id: '',
        displayName: '',
        role: find(roles, r => r.name === 'User'),
    })
    const [addOrUpdateUser] = useMutation<any, IAddOrUpdateUserVariables>(ADD_OR_UPDATE_USER)

    /**
     * On save user
     */
    const onSave = async () => {
        await addOrUpdateUser({
            variables: {
                user: omit({ ...model, role: model.role.name }, '__typename'),
                update: !!props.user,
            }
        })
        props.onDismiss()
    }

    /**
     * Checks if form is valid
     */
    const isFormValid = () => !validator.isEmpty(model?.id) && validator.isUUID(model?.id) && !validator.isEmpty(model?.displayName)

    return (
        <Panel
            {...pick(props, 'onDismiss', 'headerText')}
            className={styles.root}
            isOpen={true}>
            {!props.user && (
                <div className={styles.inputContainer}>
                    <Autocomplete
                        placeholder={t('common.searchPlaceholder')}
                        items={adUsers.map(u => ({
                            key: u.id,
                            displayValue: u.displayName,
                            searchValue: u.displayName,
                            data: u,
                        }))}
                        onSelected={item => setModel({
                            ...model,
                            ...item.data,
                        })}
                        onClear={() => setModel({ ...model, id: '', displayName: '' })} />
                </div>
            )}
            <div className={styles.inputContainer}>
                <ChoiceGroup
                    options={roles.map(role => ({
                        key: role.name,
                        text: role.name,
                        data: role,
                        iconProps: { iconName: role.icon }
                    }))}
                    onChange={(_event, opt) => setModel({ ...model, role: opt['data'] })}
                    defaultSelectedKey={model.role ? model.role.name : 'User'} />
            </div>
            <PrimaryButton
                className={styles.saveBtn}
                text={t('save')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Panel>
    )
}

export * from './types'

