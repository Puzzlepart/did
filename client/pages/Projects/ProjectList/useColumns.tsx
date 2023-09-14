import { IconText, ProjectLink } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { EntityLabel } from 'components/EntityLabel'
import { IListColumn } from 'components/List/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject, Project } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useProjectsContext } from '../context'
import { SET_SELECTED_PROJECT } from '../reducer/actions'
import { IProjectListProps } from './types'

/**
 * @ignore
 */
const ColumnWrapper = ({ project, children }) => (
  <div style={{ opacity: project.inactive ? 0.4 : 1 }}>{children}</div>
)

/**
 * Returns column definitions for the project list.
 *
 * @param props - The component props.
 */
export function useColumns(props: IProjectListProps): IListColumn[] {
  const { t } = useTranslation()
  const context = useProjectsContext()
  return [
    createColumnDef<Project>(
      'customer',
      t('common.customer'),
      { minWidth: 340, maxWidth: 340 },
      (project) => {
        if (!project.customer) return null
        return (
          <ColumnWrapper project={project}>
            <CustomerLink customer={project.customer} />
          </ColumnWrapper>
        )
      }
    ),
    createColumnDef<Project>(
      'key',
      t('common.keyFieldLabel'),
      {
        minWidth: 125,
        maxWidth: 125
      },
      (project) => {
        if (project.inactive) {
          return (
            <ColumnWrapper project={project}>
              <IconText
                title={t('projects.inactiveText')}
                iconName='Warning'
                styles={{ root: { color: '#ffbf00' } }}
                text={project.key}
              />
            </ColumnWrapper>
          )
        }
        return <IconText iconName={project.icon} text={project.key} />
      }
    ),
    createColumnDef<Project>(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 220 },
      (project) => (
        <ColumnWrapper project={project}>
          <ProjectLink
            project={project}
            onClick={() => context.dispatch(SET_SELECTED_PROJECT({ project }))}
          />
        </ColumnWrapper>
      )
    ),
    createColumnDef<Project>('description', t('common.descriptionFieldLabel'), {
      maxWidth: 220,
      isMultiline: true
    }),
    createColumnDef<Project>('labels', '', {}, (project) => (
      <ColumnWrapper project={project}>
        {(project.labels as LabelObject[]).map(
          (label: LabelObject, index: number) => (
            <EntityLabel key={index} label={label} />
          )
        )}
      </ColumnWrapper>
    ))
  ].filter((col) => !(props.hideColumns || []).includes(col.key))
}
