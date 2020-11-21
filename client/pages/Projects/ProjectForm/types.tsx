import { getIcons } from 'common/icons'
import { IFormValidation, Project, ProjectOptions } from 'types'
import { first } from 'underscore'

export interface IProjectFormProps {
  /**
   * Project to edit
   */
  edit?: Project

  /**
   * On submitted callback
   */
  onSubmitted?: () => void
}

export class ProjectModel {
  public name = ''
  public projectKey = ''
  public customerKey = ''
  public description = ''
  public inactive = false
  public icon = first(getIcons(1))
  public labels: string[] = []

  constructor(project?: Project) {
    if (!!project) {
      this.name = project.name
      this.projectKey = project.projectKey
      this.customerKey = project.customerKey
      this.description = project.description
      this.inactive = project.inactive
      this.icon = project.icon
      this.labels = project.labels.map((label) => label.name)
    }
  }
}

export interface IProjectFormState {
  model: ProjectModel
  options: ProjectOptions
  editMode: boolean
  projectId?: string
  validation?: IFormValidation
}

export interface IProjectFormValidationOptions {
  nameMinLength?: number
}
