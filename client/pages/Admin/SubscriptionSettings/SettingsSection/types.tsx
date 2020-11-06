import { SubscriptionSettingField } from '../types'

export interface ISettingsSectionProps {
    key: string;
    name: string;
    fields: SubscriptionSettingField[]
    settings?: Record<string, any>;
    onSettingsChanged?: (key: string, value: any) => void;
    defaultExpanded?: boolean;
}