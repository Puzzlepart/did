import { EntityLabel, IconText, IListColumn, ItemColumn } from 'components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject, Project } from 'types'
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
  const columns = useMemo(
    () =>
      [
        createColumnDef<Project>('customer', t('common.customer'), {
          minWidth: 340,
          maxWidth: 340,
          renderAs: 'customerLink'
        }),
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
                <IconText
                  title={t('projects.inactiveText')}
                  iconName='Warning'
                  styles={{ root: { color: '#ffbf00' } }}
                  text={project.key}
                />
              )
            }
            return <IconText iconName={project.icon} text={project.key} />
          }
        ),
        createColumnDef<Project>(undefined, t('common.nameFieldLabel'), {
          maxWidth: 220,
          renderAs: 'projectLink',
          createRenderProps: (project) => ({
            onClick: () => context.dispatch(SET_SELECTED_PROJECT(project))
          })
        }),
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
    [props.hideColumns]
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
