import { pick } from 'underscore'
import { getDurationHours } from '../../utils/date'
import { convertToAzEntity, EntityDescriptor } from '../../utils/table'
import MSGraphEvent from './msgraph.event'

export type GetProjectsOptions = { noParse?: boolean; sortBy?: string }

export class AzTimeEntry {
  constructor(
    public resourceId: string,
    public periodId: string,
    public projectId: string,
    public manualMatch: boolean,
    public event: MSGraphEvent,
    public labels: string[]
  ) {}

  /**
   * Get period data
   * 
   * * periodId
   * * weekNumber
   * * monthNumber
   * * year
   */
  private get _period() {
    const [weekNumber, monthNumber, year] = this.periodId.split('_').map((p) => parseInt(p, 10))
    return {
      periodId: this.periodId,
      weekNumber,
      monthNumber,
      year
    }
  }

  /**
   * Get duration in hours for the time entry using util getDurationHours
   */
  public get duration(): number {
    return getDurationHours(this.event.startDateTime, this.event.endDateTime)
  }

  /**
   * Get entity descriptior
   */
  public toEntity(): EntityDescriptor {
    return convertToAzEntity(
      `${this.periodId}_${this.event.id}`,
      {
        ...this._period,
        ...pick(this.event, 'title', 'startDateTime', 'endDateTime', 'webLink'),
        description: this.event.body,
        projectId: this.projectId,
        manualMatch: this.manualMatch,
        duration: this.duration,
        labels: this.labels.join('|')
      },
      this.resourceId,
      {
        removeBlanks: true,
        typeMap: {
          startDateTime: 'datetime',
          endDateTime: 'datetime'
        }
      }
    )
  }
}
