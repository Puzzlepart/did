
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as React from 'react';
import { HotkeyButton, HotKeyContext } from '../HotkeyButton';
import { IHotkeyModalProps } from './IHotkeyModalProps';

/**
 * @category HotkeyModal
 */
export const HotkeyModal = (props: IHotkeyModalProps) => {
    const context = React.useContext(HotKeyContext);
    if (!context) return null;
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <>
            <HotkeyButton hidden={true} hotkey={props.hotkey} onClick={() => setIsOpen(!isOpen)} />
            <Modal containerClassName='c-HotkeyModal' {...props}>
                <div className='c-HotkeyModal-title'>Hotkeys</div>
                {Array.from(context.registry.entries()).map(([key, value]) => (
                    <div key={key}>
                        <b className='c-HotkeyModal-key'>{key} </b>
                        <span>{value}</span>
                    </div>
                ))}
            </Modal>
        </>
    )
}
