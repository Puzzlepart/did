import { useContext, useState } from 'react'
import { UsersContext } from '../context'

export function useBulkImportPanel() {
    const context = useContext(UsersContext)
    const [selectedUsers, setSelectedUsers] = useState([])

    return {
        selectedUsers,
        setSelectedUsers,
        availableUsers: context.state.availableAdUsers,
    }
}
