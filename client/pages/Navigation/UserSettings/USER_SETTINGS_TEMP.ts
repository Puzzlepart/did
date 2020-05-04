import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IUserSetting {
    key: string;
    label: string;
    type: 'dropdown' | 'text' | 'bool';
    description?: string;
    defaultValue?: any;
}

export interface IUserSettingDropdown extends IUserSetting {
    options: IDropdownOption[];
}

export const USER_SETTINGS_TEMP = new Set<IUserSetting>([
    {
        key: 'UserLanguage',
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
]);