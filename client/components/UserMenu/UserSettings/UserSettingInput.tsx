import {Dropdown, Toggle} from 'office-ui-fabric-react';
import React, {useContext} from 'react';
import styles from './UserSettings.module.scss';
import {UserSettingsContext} from './context';
import {IUserSettingDropdown} from './USER_SETTINGS';
import {IUserSettingInputProps} from './types';

export const UserSettingInput = ({user, setting}: IUserSettingInputProps) => {
	const {onUpdateUserSettings} = useContext(UserSettingsContext);
	const defaultValue = user[setting.key] || setting.defaultValue;
	let element: JSX.Element;
	switch (setting.type) {
		case 'dropdown':
			{
				element = (
					<Dropdown
						{...(setting as IUserSettingDropdown)}
						onChange={(_evt, option) => {
							onUpdateUserSettings(setting.key, option.key.toString());
						}}
						defaultSelectedKey={defaultValue}
					/>
				);
			}

			break;
		case 'bool':
			{
				element = (
					<Toggle
						{...setting}
						defaultValue={defaultValue}
						onChange={(_evt, bool) => {
							onUpdateUserSettings(setting.key, bool);
						}}
					/>
				);
			}

			break;
		default:
			element = null;
	}

	return <div className={styles.inputContainer}>{element}</div>;
};
