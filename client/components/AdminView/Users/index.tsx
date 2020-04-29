
import { useQuery } from '@apollo/react-hooks';
import { List } from 'common/components/List';
import { getValueTyped as value } from 'helpers';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import GET_USERS from './GET_USERS';
import { UserFormModal, IUserFormModalProps } from './UserFormModal';

/**
 * @category AdminView
 */
export const Users = () => {
    const [userForm, setUserForm] = React.useState<IUserFormModalProps>(null);
    const { data, loading, refetch } = useQuery(GET_USERS, { fetchPolicy: 'cache-and-network' });
    const columns = [
        col('fullName', 'Name', { maxWidth: 180 }),
        col('role', 'Role'),
        col('edit', '', {}, (user: any) => <DefaultButton text='Edit' onClick={() => setUserForm({ title: user.fullName, user })} />)
    ];

    let commands: IContextualMenuItem[] = [
        {
            key: 'ENROLL_USER',
            name: 'Enroll user',
            iconProps: { iconName: 'AddFriend' },
            onClick: () => setUserForm({ title: 'Enroll new user' }),
        },
    ];

    if (loading) return <ProgressIndicator />;

    return (
        <>
            <CommandBar styles={{ root: { padding: 0 } }} items={commands} />
            <List items={value(data, 'users', [])} columns={columns} />
            {userForm && (
                <UserFormModal
                    {...userForm}
                    modal={{
                        onDismiss: event => {
                            setUserForm(null);
                            !event && refetch();
                        }
                    }} />)}
        </>
    );
}