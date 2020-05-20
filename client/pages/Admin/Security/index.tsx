import { List } from 'components'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { PermissionModal } from './PermissionModal'

/**
 * @category Admin
 */
export const Security = () => {
    const { t } = useTranslation(['admin', 'common'])
    const [form, setForm] = React.useState<boolean>(false)
    const columns = [
        col(
            'role',
            'Role',
            { maxWidth: 180 },
        ),
        col('description', 'Description'),
        col(
            'edit_delete',
            '',
            { minWidth: 180 },
            () => (
                <>
                    <DefaultButton
                        styles={{ root: { marginRight: 4 } }}
                        text={t('editLabel', { ns: 'common' })}
                        onClick={() => setForm(true)} />
                </>
            )),
    ]

    const items = [
        {
            role: 'User',
            description: ''
        },
        {
            role: 'Invoice Manager',
            description: ''
        },
        {
            role: 'Admin',
            description: ''
        }
    ]

    return (
        <>
            <List
                items={items}
                columns={columns}
                commandBar={{
                    items: [],
                    farItems: []
                }} />
            {form && <PermissionModal modal={{ onDismiss: () => setForm(false) }} />}
        </>
    )
}