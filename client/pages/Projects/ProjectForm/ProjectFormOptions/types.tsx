import { HTMLAttributes } from 'react'
import { useProjectFormOptions } from '../useProjectFormOptions'
import { useProjectModel } from '../useProjectModel'

export interface IProjectFormOptionsProps
  extends HTMLAttributes<HTMLDivElement> {
  model: ReturnType<typeof useProjectModel>
  options: ReturnType<typeof useProjectFormOptions>
}
