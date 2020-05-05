
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as React from 'react';
import { IHotkeyModalProps } from './IHotkeyModalProps';

/**
 * @category HotkeyModal
 */
export const HotkeyModal = (props: IHotkeyModalProps) => {
    return (
        <Modal containerClassName='c-HotkeyModal' {...props}>
            <div className='c-HotkeyModal-title'>Hotkeys</div>
            {Array.from(props.hotkeys.entries()).map(([key, value]) => (
                <div key={key}>
                    <b className='c-HotkeyModal-key'>{key} </b>
                    <span>{value}</span>
                </div>
            ))}
        </Modal>
    )
}

export { useHotkeyModal } from './useHotkeyModal';