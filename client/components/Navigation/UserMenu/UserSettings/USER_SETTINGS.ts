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

export const USER_SETTINGS = (resource: (key: string) => string) => new Set<IUserSetting>([
    {
        key: 'userLanguage',
        label: resource('COMMON.LANGUAGE'),
        type: 'dropdown',
        options: [
            {
                key: 'en-GB',
                text: '	English (United Kingdom)',
            },
            {
                key: 'nb',
                text: 'Norsk (bokmål)',
            }
        ],
        defaultValue: 'en-GB',
    } as IUserSettingDropdown,
]);