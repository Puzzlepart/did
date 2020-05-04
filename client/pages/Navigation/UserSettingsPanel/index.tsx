import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { UserMenuContext } from '../UserMenuContext';



export const USER_SETTINGS_TEMP = [
    {
        key: 'UserLanguage',
        label: 'User Language',
        choices: [
            {
                key: 'nb_no',
                label: 'Norsk (bokmål)'
            },
            {
                key: 'en',
                label: 'English (US)'
            }
        ]
    },
]

/**
 * @category UserSettingsPanel
 */
export const UserSettingsPanel = () => {
    const context = React.useContext(UserMenuContext);
    if (context) {
        return (
            <Panel
                isOpen={context.showSettings}
                onDismiss={_ => context.setShowSettings(false)}
                isLightDismiss={true}>
                <div>User Settings</div>
Init
            </Panel>
        );
    }
    return null;
}