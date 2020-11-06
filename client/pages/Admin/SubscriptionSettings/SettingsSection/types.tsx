import { SubscriptionSettingsInput } from 'types'

export interface ISettingsSectionProps {
    section: string;
    settings: SubscriptionSettingsInput;
    onSettingsChanged: (key: string, value: any) => void;
    defaultExpanded?: boolean;
}