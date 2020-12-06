import { getIcons } from 'common/icons'
import { IPanelProps } from 'office-ui-fabric'
import { IFormValidation, Project, ProjectOptions } from 'types'
import { first } from 'underscore'

export class ProjectModel {
  public name: string
  public projectKey: string
  public customerKey: string
  public description: string
  public inactive: boolean
  public icon: string
  public labels: string[]

  constructor(project?: Project) {
    this.name = project?.name || ''
    this.projectKey = project?.projectKey || ''
    this.customerKey = project?.customerKey || ''
    this.description = project?.description || ''
    this.inactive = project?.inactive || false
    this.icon = project?.icon || first(getIcons(1))
    this.labels = project?.labels.map((label) => label.name)
  }
}

export interface IProjectFormProps {
  /**
   * Panel props
   */
  panel?: IPanelProps

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