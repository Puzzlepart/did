/**
 * @category Timesheet
 */
export interface IActionBarProps {
    dispatch: React.Dispatch<any>;

    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;
}
