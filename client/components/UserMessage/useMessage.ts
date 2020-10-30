import { IUserMessageProps } from './types'
import * as React from 'react'

/**
 * Used to show a temporarily message
 */
export function useMessage(): [IUserMessageProps, (message: IUserMessageProps, duration?: number) => Promise<void>] {
  const [state, setState] = React.useState<IUserMessageProps>(null)

  /**
   * Set message
   *
   * @param {IUserMessageProps} message Message
   * @param {number} duration Duration in ms (defaults to 5000)
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  function set(message: IUserMessageProps, duration: number = 5000): Promise<void> {
    return new Promise<void>(resolve => {
      setState(message)
      window.setTimeout(() => {
        setState(null)
        resolve()
      }, duration)
    })
  }

  return [state, set]
}
