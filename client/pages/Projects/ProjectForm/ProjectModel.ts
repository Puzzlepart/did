/* eslint-disable tsdoc/syntax */
import { LabelObject as Label, Project } from 'types'
import _  from 'underscore'

export class ProjectModel {
  constructor(
    public name: string = '',
    public key: string = '',
    public customerKey: string = '',
    public description: string = '',
    public inactive: boolean = false,
    public icon: string = '',
    public labels: string[] = []
  ) {}

  /**
   * Initializes a `ProjectModel` from a
   * `Project`
   *
   * This is the prettiest way we have right
   * now.
   *
   * @param project - Project object
   *
   * @returns this
   */
  init?(project?: Project): ProjectModel {
    if (!project) return this
    Object.assign(this, _.pick(project, _.keys(this)))
    this.labels = ((project?.labels || []) as Label[]).map(
      (label) => label.name
    )
    return this
  }
}
