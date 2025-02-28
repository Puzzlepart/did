export interface ITimebankProps {
  hours: number
}

export interface ITimebankState {
  /**
   * The current balance of the user's timebank.
   */
  currentBalance?: number

  /**
   * The balance adjustment for the user's timebank.
   */
  balanceAdjustment: number

  /**
   * Indicates whether the user's timebank has been adjusted.
   */
  isTimebankAdjusted: boolean
}
