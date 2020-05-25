import { TFunction } from 'i18next'
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'

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

export const USER_SETTINGS = (t: TFunction) => new Set<IUserSetting>([
    {
        key: 'userLanguage',
        label: t('language'),
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
    {
        key: 'userTheme',
        label: t('Theme'),
        type: 'dropdown',
        options: [
            {
                key: 'light',
                text: 'Light',
            },
            {
                key: 'dark',
                text: 'Dark',
            }
        ],
        defaultValue: 'light',
    } as IUserSettingDropdown,
])