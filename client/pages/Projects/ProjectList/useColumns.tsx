import {
  EntityLabel,
  IListColumn,
  IProjectTagProps,
  ItemColumn
} from 'components'
import { IProjectLinkProps } from 'components/ProjectLink/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject, Project } from 'types'
import _ from 'underscore'
import { fuzzyContains, mapProperty } from 'utils'
import { createColumnDef } from 'utils/createColumnDef'
import { useProjectsContext } from '../context'
import { SET_SELECTED_PROJECT } from '../reducer'
import { IProjectListProps } from './types'

/**
 * Column wrapper component that sets opacity to 0.4 if project is inactive.
 *
 * @category Projects
 */
const ColumnWrapper = ({ project, children }) => (
  <div style={{ opacity: project.inactive ? 0.4 : 1 }}>{children}</div>
)

/**
 * Returns column definitions for the project list.
 *
 * @param props - The component props.
 *
 * @category Projects
 */
export function useColumns(props: IProjectListProps): IListColumn[] {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const outlookCategories = mapProperty(
    context?.state?.outlookCategories,
    'displayName'
  )
  const columns = useMemo(
    () =>
      [
        createColumnDef<Project, IProjectTagProps>(
          'tag',
          t('common.tagFieldLabel'),
          {
            minWidth: 160,
            maxWidth: 240,
            renderAs: 'projectTag',
            createRenderProps: (project) => ({
              project,
              displayIcon: true,
              hasOutlookCategory: fuzzyContains(outlookCategories, project.tag),
              enableFavoriting: !_.isEmpty(outlookCategories)
            })
          }
        ),
        createColumnDef<Project>('customer', t('common.customer'), {
          minWidth: 180,
          maxWidth: 200,
          renderAs: 'customerLink'
        }),
        createColumnDef<Project, IProjectLinkProps>(
          'name',
          t('common.nameFieldLabel'),
          {
            minWidth: 220,
            maxWidth: 260,
            renderAs: 'projectLink',
            createRenderProps: (project) => ({
              project,
              onClick: () => context.dispatch(SET_SELECTED_PROJECT(project)),
              showIcon: false
            })
          }
        ),
        createColumnDef<Project>(
          'description',
          t('common.descriptionFieldLabel'),
          {
            maxWidth: 220,
            isMultiline: true
          }
        ),
        createColumnDef<Project>(
          'labels',
          t('common.labelFieldLabel'),
          {},
          (project) => (
            <>
              {(project.labels as LabelObject[]).map((label, index: number) => (
                <EntityLabel key={index} label={label} />
              ))}
            </>
          )
        )
      ].filter((col) => !(props.hideColumns || []).includes(col.key)),
    [props.hideColumns, outlookCategories]
  )

  const columnsWithWrapper = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        onRender: (project: Project) => (
          <ColumnWrapper project={project}>
            <ItemColumn column={column} item={project} />
          </ColumnWrapper>
        )
      })),
    [columns]
  )

  return columnsWithWrapper
}
