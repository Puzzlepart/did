import { MutableRefObject, useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 *
 * @param ref - Ref to the element
 * @param callback - Callback function
 */
export function useOutsideAlerter(
  ref: MutableRefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = ({ target }: any) => {
      if (ref.current && !ref.current.contains(target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
