import * as React from 'react';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { HotkeyButton } from '../HotkeyButton';

export const HotkeyContextualMenuItem = (menuItem: IContextualMenuItem, hotkey: string, registry?: Map<string, string>) => ({
    ...menuItem,
    onRender: () => (
        <HotkeyButton
            type={menuItem.iconOnly ? 'action' : 'default'}
            hotkey={hotkey}
            registry={registry}
            iconProps={menuItem.iconProps}
            text={menuItem.title}
            onClick={_ => menuItem.onClick()}
            disabled={menuItem.disabled} />
    )
})