import { HTMLAttributes } from 'react'
import { IUserMessageProps } from './types'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const container: HTMLAttributes<HTMLDivElement> = {
    id: props.id,
    hidden: props.hidden,
    onClick: props.onClick
  }

  // eslint-disable-next-line no-console
  console.log(container)

  return { container }
}
