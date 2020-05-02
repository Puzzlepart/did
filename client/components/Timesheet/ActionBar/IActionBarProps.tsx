/**
 * @category Timesheet
 */
export interface IActionBarProps {

    /**
     * On change period callback
     */
    onChangePeriod: (periodId: string) => void;

    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;
}
