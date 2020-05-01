import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

/**
 * @category HotkeyButton
 */
export interface IHotkeyButtonProps extends IButtonProps {
    /**
     * Shortcut/hotkey for the button action. If you specify registry the hotkey can be retrieved from there.
     */
    hotkey?: string;

    /**
     * Optional hot key description, defaults to text property
     */
    hotkeyDescription?: string;

    /**
     * Render primary button
     */
    type?: 'primary' | 'action' | 'default';

    /**
     * Registry of shortscuts to add the action to
     */
    registry?: Map<string, string>;
}
