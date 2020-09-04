import React from 'react'

export const UserSettingsContext = React.createContext<{
    onUpdateUserSettings: (key: string, value: string | boolean) => void;
}>(null)