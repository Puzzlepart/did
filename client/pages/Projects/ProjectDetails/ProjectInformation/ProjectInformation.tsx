import { EntityLabel, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, StyledComponent } from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import { InformationProperty } from './InformationProperty'
import styles from './ProjectInformation.module.scss'

/**
 * Shows details about the selected project.
 *
 * @category Projects
 */
export const ProjectInformation: StyledComponent = () => {
  const { t } = useTranslation()
  const { state } = useProjectsContext()

  return (
    <div className={ProjectInformation.className}>
      <UserMessage
        hidden={!state.selected?.inactive}
        text={t('projects.inactiveText')}
        intent='warning'
      />
      <InformationProperty
        title={t('projects.tagLabel')}
        value={state.selected?.tag}
      />
      {!_.isEmpty(state.selected?.labels) && (
        <InformationProperty title={t('admin.labels.headerText')}>
          {(state.selected?.labels as Label[]).map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </InformationProperty>
      )}
      <UserMessage
        hidden={!state.selected?.outlookCategory}
        text={t('projects.categoryOutlookText')}
      />
    </div>
  )
}

ProjectInformation.displayName = 'ProjectInformation'
ProjectInformation.className = styles.projectInformation
