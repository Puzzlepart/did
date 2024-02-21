import color from 'randomcolor'
import { useMemo } from 'react'

export function useRandomColor(
  seed: string,
  luminosity: 'bright' | 'light' | 'dark' | 'random'
) {
  return useMemo(() => {
    return color({ seed, luminosity })
  }, [seed, luminosity])
}
