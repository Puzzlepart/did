import * as React from 'react';
import { HotkeyModal } from '.';
import { HotkeyButton } from '../HotkeyButton';

/**
 * @category HotkeyModal
 */
export function useHotkeyModal(hotkeys: Map<string, string>, hotkey: string): [React.ReactElement] {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const element = (
        <>
            <HotkeyButton hidden={true} hotkey={hotkey} onClick={_ => setIsOpen(!isOpen)} />
            <HotkeyModal isOpen={isOpen} hotkeys={hotkeys} />
        </>
    );

    return [element];
}