import { AppContext } from 'AppContext';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { UserSettingInput } from './UserSettingInput';
import styles from './UserSettings.module.scss';
import { USER_SETTINGS_TEMP } from './USER_SETTINGS_TEMP';

export type IUserSettingsProps = React.HTMLProps<HTMLDivElement>

/**
 * @category UserSettings
 */
export const UserSettings = (props: IUserSettingsProps) => {
    const { user } = React.useContext(AppContext);
    const [isOpen, toggle] = React.useState(true);

    return (
        <a
            href='#'
            className={props.className}
            onClick={() => toggle(true)} style={{ fontSize: 12 }}>
            <span>Settings</span>
            <Panel
                className={styles.panel}
                headerText='Settings'
                isOpen={isOpen}
                onDismiss={() => toggle(false)}
                isLightDismiss={true}>
                {[...USER_SETTINGS_TEMP].map((s, idx) => (
                    <UserSettingInput
                        key={idx}
                        user={user}
                        setting={s} />
                ))}
            </Panel>
        </a>
    );
}