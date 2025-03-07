import { IProjectLinkProps } from 'components'
import { ProjectFilter } from 'components/FilterPanel'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Parent project column definition for reports list
 */
export const parentProjectColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, IProjectLinkProps>(
    'project.parent.name',
    t('common.parentProject'),
    {
      minWidth: 100,
      maxWidth: 140,
      renderAs: 'projectLink',
      createRenderProps: ({ project }) => ({
        project: project.parent,
        showIcon: false
      }),
      data: {
        isSortable: true,
        isGroupable: true,
        isFilterable: true,
        filterType: ProjectFilter
      }
    }
  )
