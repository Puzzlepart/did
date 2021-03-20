import { IconText } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { EntityLabel } from 'components/EntityLabel'
import { IListColumn } from 'components/List/types'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, Project } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { NameLabel } from './NameLabel'
import { IProjectListProps } from './types'

/**
 * Returns column definitions
 */
export function useColumns(props: IProjectListProps): IListColumn[] {
  const { t } = useTranslation()
  return [
    col('key', '', { minWidth: 125, maxWidth: 125 }, (project: Project) => {
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
    }),
    col(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 220 },
      (project: Project) => (
        <NameLabel project={project} renderLink={props.renderLink} />
      )
    ),
    col(
      'customer',
      t('common.customer'),
      { maxWidth: 220 },
      (project: Project) => {
        if (!project.customer) return null
        return <CustomerLink customer={project.customer} />
      }
    ),
    col('labels', '', {}, (project: Project) =>
      (project.labels as Label[]).map((label, index) => (
        <EntityLabel key={index} label={label} />
      ))
    )
  ].filter((col) => !(props.hideColumns || []).includes(col.key))
}
