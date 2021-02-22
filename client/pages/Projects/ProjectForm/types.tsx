import { getIcons } from 'common/icons'
import { IPanelProps } from 'office-ui-fabric'
import { IFormValidation, LabelObject as Label, Project, ProjectOptions } from 'types'
import { first } from 'underscore'

export class ProjectModel {
  public name: string
  public key: string
  public customerKey: string
  public description: string
  public inactive: boolean
  public icon: string
  public labels: string[]

  /**
   * Constructs a new ProjectModel from a Project object
   *
   * @param {Project} project Project object
   */
  constructor(project?: Project) {
    this.name = project?.name || ''
    this.key = project?.key || ''
    this.customerKey = project?.customerKey || ''
    this.description = project?.description || ''
    this.inactive = project?.inactive || false
    this.icon = project?.icon || first(getIcons(1))
    this.labels = ((project?.labels || []) as Label[]).map((label) => label.name)
  }
}

interface IProjectFormPanelProps extends IPanelProps {
  onSave: () => void
}

export interface IProjectFormProps {
  /**
   * Panel props provided if the form is rendered within a panel
   */
  panel?: IProjectFormPanelProps

  /**
   * Project to edit
   */
  edit?: Project
}

export interface IProjectFormState {
  model: ProjectModel
  options: ProjectOptions
  editMode: boolean
  projectId?: string
  validation?: IFormValidation
}
