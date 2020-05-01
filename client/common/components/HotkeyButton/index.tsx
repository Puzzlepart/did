
import { ActionButton, DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost, TooltipDelay } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import Hotkeys from 'react-hot-keys';
import _ from 'underscore';
import { IHotkeyButtonProps } from './IHotkeyButtonProps';

/**
 * @category HotkeyButton
 */
export const HotkeyButton = (props: IHotkeyButtonProps) => {
    if (props.registry) props.registry.set(props.hotkey, props.hotkeyDescription || props.text);
    let buttonElement = <DefaultButton {..._.omit(props, 'hotkey', 'registry')} />;

    switch (props.type) {
        case 'primary': {
            buttonElement = <PrimaryButton {..._.omit(props, 'hotkey', 'registry')} />;
        }
        case 'action': {
            buttonElement = <ActionButton {..._.omit(props, 'hotkey', 'registry')} text='' />;
        }
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
                onKeyUp={_ => props.onClick(null)}>
                {buttonElement}
            </Hotkeys>
        </TooltipHost>

    )
}