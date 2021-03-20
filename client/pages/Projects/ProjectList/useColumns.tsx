/* eslint-disable tsdoc/syntax */
import { IconText } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { EntityLabel } from 'components/EntityLabel'
import { IListColumn } from 'components/List/types'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject, Project } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { NameLabel } from './NameLabel'
import { IProjectListProps } from './types'

/**
 * @ignore
 */
const ColumnWrapper = ({ project, children }) => (
  <div style={{ opacity: project.inactive ? 0.4 : 1 }}>{children}</div>
)

/**
 * Returns column definitions
 */
export function useColumns(props: IProjectListProps): IListColumn[] {
  const { t } = useTranslation()
  return [
    col(
      'key',
      '',
      {
        minWidth: 125,
        maxWidth: 125
      },
      (project: Project) => {
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
    col(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 220 },
      (project: Project) => (
        <ColumnWrapper project={project}>
          <NameLabel project={project} renderLink={props.renderLink} />
        </ColumnWrapper>
      )
    ),
    col(
      'customer',
      t('common.customer'),
      { maxWidth: 220 },
      (project: Project) => {
        if (!project.customer) return null
        return (
          <ColumnWrapper project={project}>
            <CustomerLink customer={project.customer} />
          </ColumnWrapper>
        )
      }
    ),
    col('labels', '', {}, (project) => (
      <ColumnWrapper project={project}>
        {project.labels.map((label: LabelObject, index: number) => (
          <EntityLabel key={index} label={label} />
        ))}
      </ColumnWrapper>
    ))
  ].filter((col) => !(props.hideColumns || []).includes(col.key))
}
