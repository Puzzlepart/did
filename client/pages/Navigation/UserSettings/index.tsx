import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { AppContext } from '../../../AppContext';
import { IUserSettingDropdown, USER_SETTINGS_TEMP } from './USER_SETTINGS_TEMP';

export type IUserSettingsProps = React.HTMLProps<HTMLDivElement>

/**
 * @category UserSettings
 */
export const UserSettings = (props: IUserSettingsProps) => {
    const { user } = React.useContext(AppContext);
    const [isOpen, toggle] = React.useState(false);
    console.log(user, 5);
    
    return (
        <>
            <a
                href='#'
                className={props.className}
                onClick={() => toggle(true)} style={{ fontSize: 12 }}>Settings</a>
            <Panel
                isOpen={isOpen}
                onDismiss={_ => toggle(false)}
                isLightDismiss={true}>
                <div>User Settings</div>
                {[...USER_SETTINGS_TEMP].map((s, idx) => {
                    switch(s.type) {
                        case 'dropdown': return <Dropdown key={idx} {...s as IUserSettingDropdown} />;
                        case 'text': return <TextField key={idx} {...s} />;
                        case 'bool': return <Toggle key={idx} {...s} />;
                        default: return null;
                    }
                })}
            </Panel>
        </>
    );
}