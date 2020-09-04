import { useMutation } from '@apollo/react-hooks'
import { IUser } from 'interfaces'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { find, omit } from 'underscore'
import validator from 'validator'
import ADD_OR_UPDATE_USER, { IAddOrUpdateUserVariables } from './ADD_OR_UPDATE_USER'
import { IUserFormModalProps } from './types'
import styles from './UserFormModal.module.scss'

/**
 * @category Admin
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const { t } = useTranslation('common')
    const [model, setModel] = React.useState<IUser>(props.user || {
        id: '',
        fullName: '',
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
        props.modal.onDismiss()
    }

    /**
     * Checks if form is valid
     */
    const isFormValid = () => {
        return !validator.isEmpty(model.id) && validator.isUUID(model.id) && !validator.isEmpty(model.fullName)
    }

    return (
        <Modal
            {...props.modal}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title} hidden={!props.title}>
                {props.title}
            </div>
            <div className={styles.inputContainer} hidden={!!props.user}>
                <TextField
                    label='ID'
                    placeholder='00000000-0000-0000-0000-000000000000'
                    description={t('userIdDescription')}
                    value={model.id}
                    required={!props.user}
                    onChange={(_, id) => setModel({ ...model, id })} />
            </div>
            <div className={styles.inputContainer} hidden={!!props.user}>
                <TextField
                    label={t('nameLabel')}
                    value={model.fullName}
                    required={!props.user}
                    onChange={(_, fullName) => setModel({ ...model, fullName })} />
            </div>
            <div className={styles.inputContainer}>
                <Dropdown
                    label={t('roleLabel')}
                    options={props.roles.map(role => ({
                        key: role.name,
                        text: role.name,
                        data: role,
                    }))}
                    defaultSelectedKey={model.role ? model.role.name : 'User'}
                    onChange={(_, { data: role }) => setModel({ ...model, role })} />
            </div>
            <PrimaryButton
                className={styles.saveBtn}
                text={t('save')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    )
}

export { IUserFormModalProps }

