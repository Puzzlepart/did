import { useMutation } from '@apollo/react-hooks';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { IUserFormModalProps } from './IUserFormModalProps';
import UPDATE_USER from './UPDATE_USER';
import ADD_USER from './ADD_USER';
import _ from 'underscore';

/**
 * @component UserFormModal
 * @description
 */
export const UserFormModal = (props: IUserFormModalProps) => {
    const [user, setUser] = React.useState(props.user || {});
    let [updateUser] = useMutation(UPDATE_USER);
    let [addUser] = useMutation(ADD_USER);

    const onSave = async () => {
        if (props.user) await updateUser({ variables: { user: _.omit(user, '__typename') } });
        else await addUser({ variables: { user: _.omit(user, '__typename') } });
        props.modal.onDismiss();
    }

    return (
        <Modal
            {...props.modal}
            containerClassName='c-AdminView-userFormModal'
            isOpen={true}>
            <div className='c-AdminView-userFormModal-title' hidden={!props.title}>{props.title}</div>
            <TextField
                label='ID'
                value={user.id}
                disabled={!!props.user}
                required={!props.user}
                onChange={(_, id) => setUser({ ...user, id })} />
            <TextField
                label='Name'
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
                defaultSelectedKey='User'
                onChange={(_, opt) => setUser({ ...user, role: opt.key })} />
            <PrimaryButton
                className='c-AdminView-userFormModal-saveBtn'
                text='Save'
                onClick={onSave} />
        </Modal>
    );
}

export { IUserFormModalProps };