import { useMutation } from '@apollo/react-hooks'
import { IUser } from 'interfaces'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import validator from 'validator'
import ADD_USER from './ADD_USER'
import { IUserFormModalProps } from './IUserFormModalProps'
import UPDATE_USER from './UPDATE_USER'
import styles from './UserFormModal.module.scss'

/**
 * @category Admin
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const { t } = useTranslation('common')
    const [user, setUser] = React.useState<IUser>(props.user || { id: '', fullName: '', role: 'User' })
    const [updateUser] = useMutation(UPDATE_USER)
    const [addUser] = useMutation(ADD_USER)

    /**
     * On save
     */
    const onSave = async () => {
        if (props.user) await updateUser({ variables: { user: _.omit(user, '__typename') } })
        else await addUser({ variables: { user } })
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
            <TextField
                label='ID'
                description={t('userIdDescription')}
                value={user.id}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, id) => setUser({ ...user, id })} />
            <TextField
                label={t('nameLabel')}
                value={user.fullName}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, fullName) => setUser({ ...user, fullName })} />
            <Dropdown
                label={t('roleLabel')}
                options={[
                    { key: 'User', text: t('roleUser') },
                    { key: 'Admin', text: t('roleAdmin') },
                ]}
                defaultSelectedKey={user.role}
                onChange={(_, opt) => setUser({ ...user, role: opt.key.toString() })} />
            <PrimaryButton
                className={styles.saveBtn}
                text={t('save')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    )
}

export { IUserFormModalProps }

