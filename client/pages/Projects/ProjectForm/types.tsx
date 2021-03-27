/* eslint-disable tsdoc/syntax */
import { IPanelProps } from '@fluentui/react'
import { ITabItemProps } from 'components/TabContainer'
import {
  IFormValidation,
  LabelObject as Label,
  Project,
  ProjectOptions
} from 'types'
import { pick, keys, omit } from 'underscore'

/**
 * @category Projects
 */
export class ProjectModel {
  /**
   * Constructs a new `ProjectModel`
   */
  constructor(
    public name: string = '',
    public key: string = '',
    public customerKey: string = '',
    public description: string = '',
    public inactive: boolean = false,
    public icon: string = '',
    public labels: string[] = []
  ) {}


  init?(project: Project): ProjectModel {
    Object.assign(this, pick(project, omit(keys(this), 'labels')))
    this.labels = ((project?.labels || []) as Label[]).map(
      (label) => label.name
    )
    return this
  }
}

/**
 * Empty initialization of `ProjectModel`
 */
 export const _ProjectModel = new ProjectModel()

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
