import { PositioningImperativeRef } from '@fluentui/react-components'
import { useEffect, useRef } from 'react'

/**
 * A hook that returns a ref and a positioning ref for a color picker field.
 * The ref can be attached to a DOM element to be used as a target for the positioning ref.
 *
 * @returns An object containing a ref and a positioning ref.
 */
export function useColorPickerField() {
  const ref = useRef<HTMLDivElement>(null)
  const positioningRef = useRef<PositioningImperativeRef>(null)
  useEffect(() => {
    if (ref.current) {
      positioningRef.current?.setTarget(ref.current)
    }
  }, [ref, positioningRef])
  return { ref, positioningRef }
}
