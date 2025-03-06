import { useSubscriptionSettings } from 'AppContext'
import {
  EntityLabel,
  InformationProperty,
  ProjectLink,
  ProjectTag,
  UserMessage
} from 'components'
import { SET_SELECTED_PROJECT } from 'pages/Projects/reducer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {
  LabelObject as Label,
  StyledComponent
} from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import { BudgetTracking } from './BudgetTracking'
import styles from './ProjectInformation.module.scss'
import { ProjectResources } from './ProjectResources'

/**
 * Shows details about the selected project.
 *
 * @category Projects
 */
export const ProjectInformation: StyledComponent = () => {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const enableSimpleHierachy =
    useSubscriptionSettings<boolean>('projects.enableSimpleHierachy')

  return (
    <div className={ProjectInformation.className}>
      <UserMessage
        hidden={!context.state.selected?.inactive}
        text={t('projects.inactiveText')}
        intent='warning'
      />
      <UserMessage
        hidden={Boolean(context.state.selected) || context.loading}
        headerText={t('projects.projecNotReadyOrNotFoundTitle')}
        text={t('projects.projecNotReadyOrNotFound')}
        intent='warning' 
        action={{
          iconName: 'Refresh',
          text: t('common.refreshText'),
          onClick: () => document.location.reload()
        }} />
      <InformationProperty
        hidden={!context.state.selected?.tag}
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
      <ProjectResources />
      <BudgetTracking />
      <InformationProperty
        hidden={_.isEmpty(context.state.selected?.labels)}
        title={t('common.labelsText')}
        isDataLoaded={!context.loading}
      >
        {((context.state.selected?.labels ?? []) as Label[]).map(
          (label, index) => (
            <EntityLabel key={index} label={label} />
          )
        )}
      </InformationProperty>
      <InformationProperty
        hidden={
          !context.state.selected?.parent || !enableSimpleHierachy
        }
        title={t('projects.parentLabel')}
        onRenderValue={() => (
          <ProjectLink
            project={context.state.selected?.parent}
            onClick={() =>
              context.dispatch(
                SET_SELECTED_PROJECT(context.state.selected?.parent?.tag)
              )
            }
          />
        )}
        isDataLoaded={!context.loading}
      />
      <InformationProperty
        hidden={
          _.isEmpty(context.state.selected?.children) ||
          !enableSimpleHierachy
        }
        title={t('projects.childrenLabel')}
        onRenderValue={() => (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            {context.state.selected?.children?.map((child, index) => (
              <ProjectLink
                key={index}
                project={child}
                onClick={() =>
                  context.dispatch(SET_SELECTED_PROJECT(child.tag))
                }
              />
            ))}
          </div>
        )}
        isDataLoaded={!context.loading}
      />
    </div>
  )
}

ProjectInformation.displayName = 'ProjectInformation'
ProjectInformation.className = styles.projectInformation
