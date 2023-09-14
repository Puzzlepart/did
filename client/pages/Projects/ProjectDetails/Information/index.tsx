import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, StyledComponent } from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import styles from './Information.module.scss'
import { InformationProperty } from './InformationProperty'

/**
 * @category Projects
 */
export const Information: StyledComponent = () => {
  const { t } = useTranslation()
  const { state } = useProjectsContext()

  return (
    <div className={Information.className}>
      {state.selected?.inactive && (
        <UserMessage
          hidden={!state.selected?.inactive}
          text={t('projects.inactiveText')}
          intent='warning'
        />
      )}
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

Information.displayName = 'ProjectDetails.Information'
Information.className = styles.information
