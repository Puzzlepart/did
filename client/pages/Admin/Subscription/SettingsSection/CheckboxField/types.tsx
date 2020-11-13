import { ISubscriptionSettingCheckbox } from '../../types'

export interface ICheckboxFieldProps extends ISubscriptionSettingCheckbox {
    settings: Record<string, any>;
}
