import { useMutation } from '@apollo/react-hooks'
import { IUser } from 'interfaces'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { omit, find } from 'underscore'
import validator from 'validator'
import { IUserFormModalProps, } from './types'
import styles from './UserFormModal.module.scss'
import ADD_OR_UPDATE_USER from './ADD_OR_UPDATE_USER'

/**
 * @category Admin
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const { t } = useTranslation('common')
    const [user, setUser] = React.useState<IUser>(props.user || {
        id: '',
        fullName: '',
        role: find(props.roles, r => r.name === 'User'),
    })
    const [addOrUpdateUser] = useMutation(ADD_OR_UPDATE_USER)

    const onSave = async () => {
        const _user = omit({ ...user, role: user.role.name }, '__typename')
        await addOrUpdateUser({ variables: { user: _user } })
        props.modal.onDismiss()
    }

    const isFormValid = () => {
        return !validator.isEmpty(user.id) && validator.isUUID(user.id) && !validator.isEmpty(user.fullName)
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
                    value={user.id}
                    required={!props.user}
                    onChange={(_, id) => setUser({ ...user, id })} />
            </div>
            <div className={styles.inputContainer} hidden={!!props.user}>
                <TextField
                    label={t('nameLabel')}
                    value={user.fullName}
                    required={!props.user}
                    onChange={(_, fullName) => setUser({ ...user, fullName })} />
            </div>
            <div className={styles.inputContainer}>
                <Dropdown
                    label={t('roleLabel')}
                    options={props.roles.map(role => ({
                        key: role.name,
                        text: role.name,
                        data: role,
                    }))}
                    defaultSelectedKey={user.role ? user.role.name : 'User'}
                    onChange={(_, { data: role }) => setUser({ ...user, role })} />
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

