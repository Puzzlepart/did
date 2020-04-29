import { useMutation } from '@apollo/react-hooks';
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


/**
 * @category AdminView
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const [user, setUser] = React.useState<IUser>(props.user || { id: '', fullName: '', role: 'User' });
    let [updateUser] = useMutation(UPDATE_USER);
    let [addUser] = useMutation(ADD_USER);

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
            containerClassName='c-AdminView-userFormModal'
            isOpen={true}>
            <div className='c-AdminView-userFormModal-title' hidden={!props.title}>{props.title}</div>
            <TextField
                label='ID'
                description='ID of the user in Azure Active Directory.'
                value={user.id}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, id) => setUser({ ...user, id })} />
            <TextField
                label='Name'
                description='Full name of the user.'
                value={user.fullName}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, fullName) => setUser({ ...user, fullName })} />
            <Dropdown
                label='Role'
                options={[
                    { key: 'User', text: 'User' },
                    { key: 'Admin', text: 'Admin' },
                ]}
                defaultSelectedKey={user.role}
                onChange={(_, opt) => setUser({ ...user, role: opt.key.toString() })} />
            <PrimaryButton
                className='c-AdminView-userFormModal-saveBtn'
                text='Save'
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { IUserFormModalProps };
