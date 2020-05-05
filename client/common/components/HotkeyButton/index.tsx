
import { ActionButton, DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import * as React from 'react';
import Hotkeys from 'react-hot-keys';
import _ from 'underscore';
import { IHotkeyButtonProps } from './IHotkeyButtonProps';

export const HotKeyContext = React.createContext<{ registry: Map<string, string> }>(null);

/**
 * @category HotkeyButton
 */
export const HotkeyButton = (props: IHotkeyButtonProps) => {
    const context = React.useContext(HotKeyContext);
    if (!context) return null;
    context.registry.set(props.hotkey, props.hotkeyDescription || props.text);
    let buttonElement = null;

    switch (props.type) {
        case 'primary': buttonElement = <PrimaryButton {..._.omit(props, 'hotkey', 'registry')} />; break;
        case 'action': buttonElement = <ActionButton {..._.omit(props, 'hotkey', 'registry')} text='' />; break;
        default: buttonElement = <DefaultButton {..._.omit(props, 'hotkey', 'registry')} />;
    }

    return (
        <TooltipHost
            hidden={false}
            tooltipProps={{
                onRenderContent: () => (
                    <div style={{ padding: 4 }}>
                        <p>
                            <span>This action supports hot key <b style={{ display: 'inline-block', textTransform: 'uppercase', letterSpacing: 1 }}>{props.hotkey}</b></span>
                        </p>
                        <p>
                            Click <b style={{ display: 'inline-block', textTransform: 'uppercase', letterSpacing: 1 }}>ALT+I</b> to show a list of available shortcuts.
                        </p>
                    </div>
                ),
            }}
            calloutProps={{ gapSpace: 0 }}
            delay={TooltipDelay.long}>
            <Hotkeys
                keyName={props.hotkey}
                disabled={props.disabled}
                onKeyUp={() => props.onClick(null)}>
                {buttonElement}
            </Hotkeys>
        </TooltipHost>

    )
}