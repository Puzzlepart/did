import {
  EntityLabel,
  InformationProperty,
  ProjectTag,
  UserMessage
} from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, StyledComponent } from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import styles from './ProjectInformation.module.scss'
import { BudgetTracking } from './BudgetTracking'
import ReactMarkdown from 'react-markdown'

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
        onRenderValue={() => (
          <ProjectTag
            project={context.state.selected}
            enableFavoriting
            hasOutlookCategory={!!context.state.selected?.outlookCategory}
          />
        )}
        isDataLoaded={!context.loading}
      />
      <InformationProperty
        hidden={!context.state.selected?.description}
        title={t('common.descriptionFieldLabel')}
        value={context.state.selected?.description}
        onRenderValue={(value) => <ReactMarkdown>{value}</ReactMarkdown>}
        isDataLoaded={!context.loading}
      />
      <BudgetTracking />
      <InformationProperty
        hidden={_.isEmpty(context.state.selected?.labels)}
        title={t('common.labelsText')}
        isDataLoaded={!context.loading}
      >
        {(context.state.selected?.labels as Label[]).map((label, index) => (
          <EntityLabel key={index} label={label} />
        ))}
      </InformationProperty>
    </div>
  )
}

ProjectInformation.displayName = 'ProjectInformation'
ProjectInformation.className = styles.projectInformation
