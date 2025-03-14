import { useState } from 'react'
import { IToastProps } from './types'

/**
 * Hook used to show a temporarily `<Toast />`
 *
 * @param defaultDuration - Default duration
 * @param defaultProps - Default props
 *
 * @category Toast
 */
export function useToast(
  defaultDuration = 5000,
  defaultProps: IToastProps = {}
) {
  const [state, setState] = useState<IToastProps>(null)

  /**
   * Set message
   *
   * @param message - Message
   * @param duration - Duration in ms (defaults to 5000)
   */
  function set(message: IToastProps, duration: number = defaultDuration) {
    const props = { ...defaultProps, ...message }
    setState(props)
    window.setTimeout(() => {
      setState(null)
    }, duration)
  }

  return [state, set, !!state] as const
}
