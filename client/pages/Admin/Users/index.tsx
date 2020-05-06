
import { useQuery } from '@apollo/react-hooks';
import List from 'common/components/List';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import GET_USERS from './GET_USERS';
import { IUserFormModalProps, UserFormModal } from './UserFormModal';

/**
 * @category Admin
 */
export const Users = () => {
    const [userForm, setUserForm] = React.useState<IUserFormModalProps>(null);
    const { data, loading, refetch } = useQuery(GET_USERS, { fetchPolicy: 'cache-and-network' });
    const columns = [
        col('fullName', resource('COMMON.NAME_LABEL'), { maxWidth: 180 }),
        col('role', resource('COMMON.ROLE_LABEL')),
        col('edit', '', {}, (user: any) => (
            <DefaultButton
                text={resource('ADMIN.EDIT_USER')}
                onClick={() => setUserForm({ title: user.fullName, user })} />
        ))
    ];

    const commands: IContextualMenuItem[] = [
        {
            key: 'ADD_NEW_USER',
            name: resource('ADMIN.ADD_NEW_USER'),
            iconProps: { iconName: 'AddFriend' },
            onClick: () => setUserForm({ title: resource('ADMIN.ADD_NEW_USER') }),
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