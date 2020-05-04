import { languages } from 'i18n';
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

export const USER_SETTINGS = new Set<IUserSetting>([
    {
        key: 'userLanguage',
        label: 'Language',
        type: 'dropdown',
        options: Object.keys(languages).map(key => ({
            key,
            text: languages[key].lng,
        })),
        defaultValue: 'en',
    } as IUserSettingDropdown,
    {
        key: 'darkMode',
        label: 'Dark mode',
        type: 'bool',
        defaultValue: false,
    } as IUserSetting,
]);