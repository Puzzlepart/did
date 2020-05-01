import { IModalProps } from 'office-ui-fabric-react/lib/Modal';

export interface IHotkeyModalProps extends IModalProps {
    hotkeys: Map<string, string>;
}
