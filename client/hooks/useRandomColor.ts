import color from 'randomcolor'
import { useMemo } from 'react'

export function useRandomColor(
  seed: string,
  luminosity: 'bright' | 'light' | 'dark' | 'random'
) {
  return useMemo(() => {
    // eslint-disable-next-line no-console
    console.log(seed, luminosity)
    return color({ seed, luminosity })
  }, [seed, luminosity])
}
