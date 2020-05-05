import { AppContext } from 'AppContext';
import resource from 'i18n';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { UserSettingInput } from './UserSettingInput';
import styles from './UserSettings.module.scss';
import { USER_SETTINGS } from './USER_SETTINGS';

export type IUserSettingsProps = React.HTMLProps<HTMLDivElement>

/**
 * @category UserSettings
 */
export const UserSettings = (props: IUserSettingsProps) => {
    const { user } = React.useContext(AppContext);
    const [isOpen, toggle] = React.useState<boolean>(false);

    return (
        <a
            href='#'
            className={props.className}
            onClick={() => toggle(true)} style={{ fontSize: 12 }}>
            <span>{resource('COMMON.SETTINGS')}</span>
            <Panel
                className={styles.panel}
                headerText={resource('COMMON.SETTINGS')}
                isOpen={isOpen}
                onDismiss={() => toggle(false)}
                isLightDismiss={true}>
                {[...USER_SETTINGS(resource)].map((s, idx) => (
                    <UserSettingInput
                        key={idx}
                        user={user}
                        setting={s} />
                ))}
            </Panel>
        </a>
    );
}