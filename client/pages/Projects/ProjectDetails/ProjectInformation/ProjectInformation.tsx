import { EntityLabel, InformationProperty, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, StyledComponent } from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import styles from './ProjectInformation.module.scss'

/**
 * Shows details about the selected project.
 *
 * @category Projects
 */
export const ProjectInformation: StyledComponent = () => {
  const { t } = useTranslation()
  const context = useProjectsContext()

  return (
    <div className={ProjectInformation.className}>
      <UserMessage
        hidden={!context.state.selected?.inactive}
        text={t('projects.inactiveText')}
        intent='warning'
      />
      <InformationProperty
        title={t('projects.tagLabel')}
        value={context.state.selected?.tag}
        isDataLoaded={!context.loading}
      />
      {!_.isEmpty(context.state.selected?.labels) && (
        <InformationProperty
          title={t('common.labelsText')}
          isDataLoaded={!context.loading}
        >
          {(context.state.selected?.labels as Label[]).map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </InformationProperty>
      )}
      <UserMessage
        hidden={!context.state.selected?.outlookCategory}
        text={t('projects.categoryOutlookText')}
      />
    </div>
  )
}

ProjectInformation.displayName = 'ProjectInformation'
ProjectInformation.className = styles.projectInformation
