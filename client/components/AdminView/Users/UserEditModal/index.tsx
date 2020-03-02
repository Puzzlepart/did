import { useMutation } from '@apollo/react-hooks';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { IUserEditModalProps } from './IUserEditModalProps';
import UPDATE_USER from './UPDATE_USER';

/**
 * @component UserEditModal
 * @description
 */
export const UserEditModal = (props: IUserEditModalProps) => {
    const [user, setUser] = React.useState(props.user);
    let [updateUser, { loading }] = useMutation(UPDATE_USER);

    const onSave = async () => {
        await updateUser({ variables: { user } });
        props.modal.onDismiss();
    }

    return (
        <Modal
            {...props.modal}
            containerClassName='c-AdminView-userEditModal'
            isOpen={true}>
            <TextField label='ID' value={user.id} disabled />
            <TextField label='Name' value={user.fullName} disabled />
            <Dropdown
                label='Role'
                options={[
                    { key: 'User', text: 'User' },
                    { key: 'Admin', text: 'Admin' },
                ]}
                defaultSelectedKey={user.role}
                onChange={(_, opt) => setUser({ ...user, role: opt.key })} />
            <PrimaryButton
                className='c-AdminView-userEditModal-saveBtn'
                text='Save'
                disabled={loading}
                onClick={onSave} />
        </Modal>
    );
}