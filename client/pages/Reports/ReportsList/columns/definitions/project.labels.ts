import { IProjectTagProps } from 'components'
import { LabelList } from 'components/LabelList'
import { createElement } from 'react'
import { LabelObject, TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Project labels column definition for reports list
 */
export const projectLabelsColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, IProjectTagProps>(
    'project.labels',
    t('common.labelsText'),
    {
      minWidth: 180,
      maxWidth: 200,
      data: {
        hidden: true,
        isSortable: false,
        isFilterable: false,
      }
    },
    ({ project }) => {
      return createElement(LabelList, { labels: project.labels as LabelObject[] })
    }
  )
