import { IUserMessageProps } from './types'
import { useState } from 'react'

/**
 * Used to show a temporarily message
 */
export function useMessage(): [
  IUserMessageProps,
  (message: IUserMessageProps, duration?: number) => void
] {
  const [state, setState] = useState<IUserMessageProps>(null)

  /**
   * Set message
   *
   * @param {IUserMessageProps} message Message
   * @param {number} duration Duration in ms (defaults to 5000)
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  function set(message: IUserMessageProps, duration: number = 5000) {
    setState(message)
    window.setTimeout(() => setState(null), duration)
  }

  return [state, set]
}
