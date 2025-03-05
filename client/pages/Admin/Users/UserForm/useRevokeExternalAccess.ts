import { useMutation } from '@apollo/client'
import { IPanelProps } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { IDynamicButtonProps, ListMenuItem } from 'components'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import $revokeExternalAccess from './revokeExternalAccess.gql'

/**
 * Custom hook to handle the revocation of external access for a user.
 *
 * @param user - The user object for whom the external access is to be revoked.
 * @param onDismiss - Callback function to be called when the operation is dismissed.
 * @param menuItem - Flag to indicate if the hook should return a `ListMenuItem` object.
 *
 * @returns An object containing properties for a dynamic button.
 *
 * @remarks
 * This hook uses a GraphQL mutation to revoke external access for a user.
 * It displays a toast message based on the success or failure of the operation.
 */
export function useRevokeExternalAccess<T = IDynamicButtonProps>(
    user: User,
    onDismiss?: IPanelProps['onDismiss'],
    menuItem?: boolean
): T {
    const { t } = useTranslation()
    const { displayToast } = useAppContext()
    const [revokeExternalAccess] = useMutation<any, any>($revokeExternalAccess)

    const onClick = async () => {
        const { data } = await revokeExternalAccess({
            variables: {
                userId: user.id
            }
        })
        if (onDismiss) {
            onDismiss()
        }
        if (!data?.result?.success) {
            displayToast(t('admin.users.removeExternalUserError'), 'error', 8, {
                headerText: t('admin.users.removeExternalUserErrorTitle', user)
            })
            return
        }
        displayToast(t('admin.users.removeExternalUserSuccess'), 'success', 8, {
            headerText: t('admin.users.removeExternalUserSuccessTitle', user)
        })
    }

    return useMemo<T>(() => {
        if (!menuItem) {
            return {
                text: t('admin.users.removeExternalUser'),
                onClick: onClick,
                appearance: 'secondary',
                hidden: !user?.isExternal
            } as T
        }
        return new ListMenuItem(t('admin.users.removeExternalUser'))
            .withIcon('PersonDelete')
            .setHidden(!user?.isExternal)
            .setOnClick(onClick)
            .setGroup('actions') as T
    }, [user])
}
