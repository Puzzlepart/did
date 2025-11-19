import { Project } from 'types'

export interface IBulkEditProjectsPanelProps {
  open: boolean
  onDismiss: () => void
  projects: Project[]
  onSave: (updates: Partial<Project>) => Promise<void>
}
