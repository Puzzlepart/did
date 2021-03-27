import { useMap } from 'hooks/common/useMap'
import { ProjectOptions } from 'types'

export function useProjectFormOptions() {
    return useMap<keyof ProjectOptions>()
}
