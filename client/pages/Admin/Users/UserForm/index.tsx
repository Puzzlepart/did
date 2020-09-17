import { useMutation } from '@apollo/react-hooks'
import { Autocomplete } from 'components'
import { IUser } from 'interfaces'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { find, omit, pick } from 'underscore'
import validator from 'validator'
import ADD_OR_UPDATE_USER, { IAddOrUpdateUserVariables } from './ADD_OR_UPDATE_USER'
import { IUserFormProps } from './types'
import styles from './UserFormModal.module.scss'

/**
 * @category Admin
 */
export const UserForm = (props: IUserFormProps) => {
    const { t } = useTranslation('common')
    const [model, setModel] = useState<IUser>(props.user || {
        id: '',
        displayName: '',
        role: find(props.roles, r => r.name === 'User'),
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
    const isFormValid = () => {
        return !validator.isEmpty(model?.id) && validator.isUUID(model?.id) && !validator.isEmpty(model?.displayName)
    }

    return (
        <Panel
            {...pick(props, 'onDismiss', 'headerText')}
            className={styles.root}
            isOpen={true}>
            <div className={styles.inputContainer} hidden={!!props.user}>
                <Autocomplete
                    placeholder={t('searchPlaceholder')}
                    items={props.users.map(u => ({
                        key: u.id,
                        displayValue: u.displayName,
                        searchValue: u.displayName,
                    }))}
                    onSelected={item => setModel({
                        ...model,
                        id: item?.key as string,
                        displayName: item?.displayValue,
                    })}
                    onClear={() => setModel({ ...model, id: '', displayName: '' })} />
            </div>
            <div className={styles.inputContainer}>
                <ChoiceGroup
                    options={props.roles.map(role => ({
                        key: role.name,
                        text: role.name,
                        data: role,
                        iconProps: { iconName: role.icon }
                    }))}
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

