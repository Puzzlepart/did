/* eslint-disable tsdoc/syntax */
import { getIcons } from 'common/icons'
import { ITabItemProps } from 'components/TabContainer'
import { IPanelProps } from '@fluentui/react'
import {
  IFormValidation,
  LabelObject as Label,
  Project,
  ProjectOptions
} from 'types'
import { first } from 'underscore'

/**
 * @category Projects
 */
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
   * @param project - Project object
   */
  constructor(project?: Project) {
    this.name = project?.name || ''
    this.key = project?.key || ''
    this.customerKey = project?.customerKey || ''
    this.description = project?.description || ''
    this.inactive = project?.inactive || false
    this.icon = project?.icon || first(getIcons(1))
    this.labels = ((project?.labels || []) as Label[]).map(
      (label) => label.name
    )
  }
}

/**
 * @category Projects
 */
interface IProjectFormPanelProps extends IPanelProps {
  onSave: () => void
}

/**
 * @category Projects
 */
export interface IProjectFormProps extends ITabItemProps {
  /**
   * Panel props provided if the form is rendered within a panel
   */
  panel?: IProjectFormPanelProps

  /**
   * Project to edit
   */
  edit?: Project
}

/**
 * @category Projects
 */
export interface IProjectFormState {
  model: ProjectModel
  options: ProjectOptions
  editMode: boolean
  projectId?: string
  validation?: IFormValidation
}
