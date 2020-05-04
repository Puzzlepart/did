import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IUserSetting {
    key: string;
    label: string;
    type: 'dropdown' | 'bool';
    description?: string;
    defaultValue?: any;
}

export interface IUserSettingDropdown extends IUserSetting {
    options: IDropdownOption[];
}

export const USER_SETTINGS_TEMP = new Set<IUserSetting>([
    {
        key: 'userLanguage',
        label: 'Language',
        type: 'dropdown',
        options: [
            {
                key: 'nb_no',
                text: 'Norsk (bokmål)'
            },
            {
                key: 'en',
                text: 'English (US)'
            }
        ],
        defaultValue: 'en',
    } as IUserSettingDropdown,
    {
        key: 'darkMode',
        label: 'Dark mode',
        type: 'bool',
        defaultValue: false,
    } as IUserSetting,
]);