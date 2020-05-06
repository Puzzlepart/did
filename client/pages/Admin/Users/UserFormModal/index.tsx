import { useMutation } from '@apollo/react-hooks';
import resource from 'i18n';
import { IUser } from 'interfaces';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import _ from 'underscore';
import validator from 'validator';
import ADD_USER from './ADD_USER';
import { IUserFormModalProps } from './IUserFormModalProps';
import UPDATE_USER from './UPDATE_USER';
import styles from './UserFormModal.module.scss';

/**
 * @category Admin
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const [user, setUser] = React.useState<IUser>(props.user || { id: '', fullName: '', role: 'User' });
    const [updateUser] = useMutation(UPDATE_USER);
    const [addUser] = useMutation(ADD_USER);

    /**
     * On save
     */
    const onSave = async () => {
        if (props.user) await updateUser({ variables: { user: _.omit(user, '__typename') } });
        else await addUser({ variables: { user } });
        props.modal.onDismiss();
    }

    const isFormValid = () => {
        return !validator.isEmpty(user.id) && validator.isUUID(user.id) && !validator.isEmpty(user.fullName);
    }

    return (
        <Modal
            {...props.modal}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title} hidden={!props.title}>

            </div>
            <TextField
                label='ID'
                description={resource('COMMON.USER_ID_DESCRIPTION')}
                value={user.id}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, id) => setUser({ ...user, id })} />
            <TextField
                label={resource('COMMON.NAME_LABEL')}
                value={user.fullName}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, fullName) => setUser({ ...user, fullName })} />
            <Dropdown
                label={resource('COMMON.ROLE_LABEL')}
                options={[
                    { key: 'User', text: resource('COMMON.ROLE_USER_TEXT') },
                    { key: 'Admin', text: resource('COMMON.ROLE_ADMIN_TEXT') },
                ]}
                defaultSelectedKey={user.role}
                onChange={(_, opt) => setUser({ ...user, role: opt.key.toString() })} />
            <PrimaryButton
                className={styles.saveBtn}
                text={resource('COMMON.SAVE')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { IUserFormModalProps };

