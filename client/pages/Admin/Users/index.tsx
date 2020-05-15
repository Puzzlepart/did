
import { useQuery } from '@apollo/react-hooks';
import List from 'components/List';
import { value as value } from 'helpers';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { generateColumn as col } from 'utils/generateColumn';
import GET_USERS from './GET_USERS';
import { IUserFormModalProps, UserFormModal } from './UserFormModal';

/**
 * @category Admin
 */
export const Users = () => {
    const { t } = useTranslation(['COMMON', 'ADMIN']);
    const [userForm, setUserForm] = React.useState<IUserFormModalProps>(null);
    const { data, loading, refetch } = useQuery(GET_USERS, { fetchPolicy: 'cache-and-network' });
    const columns = [
        col('fullName', t('NAME_LABEL'), { maxWidth: 180 }),
        col('role', t('ROLE_LABEL')),
        col('edit', '', {}, (user: any) => (
            <DefaultButton
                text={t('EDIT_USER')}
                onClick={() => setUserForm({ title: user.fullName, user })} />
        ))
    ];
    if (loading) return <ProgressIndicator />;

    return (
        <>
            <List
                items={value(data, 'users', [])}
                columns={columns}
                commandBar={{
                    items: [
                        {
                            key: 'ADD_NEW_USER',
                            name: t('ADD_NEW_USER'),
                            iconProps: { iconName: 'AddFriend' },
                            onClick: () => setUserForm({ title: t('ADD_NEW_USER') }),
                        },
                    ],
                    farItems: []
                }} />
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