import { Project } from 'types'

export type DialogState =
  | 'hidden'
  | 'initial'
  | 'checking'
  | 'error'
  | 'success'

export interface IProjectDeleteDialogProps {
  /**
   * The project to delete.
   */
  project: Project

  /**
   * The current state of the dialog.
   */
  state: DialogState

  /**
   * Set the state of the dialog.
   */
  setState: (state: DialogState) => void

  /**
   * The message to display in the dialog.
   */
  message: string

  /**
   * Is the dialog loading data.
   */
  loading: boolean

  onDelete: (project: Project) => void
}
