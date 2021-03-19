/* eslint-disable tsdoc/syntax */
import { useState } from 'react'
import { IToastProps } from './types'

/**
 * Hook used to show a temporarily Toast
 *
 * @category Toast
 */
export function useToast(): [
  IToastProps,
  (message: IToastProps, duration?: number) => void
] {
  const [state, setState] = useState<IToastProps>(null)
  /**
   * Set message
   *
   * @param message - Message
   * @param duration - Duration in ms (defaults to 5000)
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  function set(message: IToastProps, duration: number = 5000) {
    setState(message)
    window.setTimeout(() => setState(null), duration)
  }

  return [state, set]
}
