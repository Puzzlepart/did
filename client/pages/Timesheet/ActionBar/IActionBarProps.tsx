/**
 * @category Timesheet
 */
export interface IActionBarProps {
    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;
}
