import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import styles from './UserSettings.module.scss';
import { IUserSetting, IUserSettingDropdown } from './USER_SETTINGS';

export interface IUserSettingInputProps {
    user: any;
    setting: IUserSetting;
}

export const UserSettingInput = ({ user, setting }: IUserSettingInputProps) => {
    const defaultValue = user[setting.key] || setting.defaultValue;
    let element: JSX.Element;
    switch (setting.type) {
        case 'dropdown': element = <Dropdown defaultSelectedKey={defaultValue} {...setting as IUserSettingDropdown} />; break;
        case 'bool': element = <Toggle  {...setting} defaultValue={defaultValue} />; break;
        default: element = null;
    }
    return (
        <div className={styles.inputContainer}>
            {element}
        </div>
    );
}