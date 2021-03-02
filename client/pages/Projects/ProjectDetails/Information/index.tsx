/* eslint-disable tsdoc/syntax */
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown/with-html'
import { LabelObject as Label } from 'types'
import { isEmpty } from 'underscore'
import { ProjectsContext } from '../../context'
import styles from './Information.module.scss'

/**
 * @category Projects
 */
export const Information: FunctionComponent = () => {
  const { t } = useTranslation()
  const { state } = useContext(ProjectsContext)

  return (
    <div className={styles.root}>
      {state.selected.inactive && (
        <UserMessage
          hidden={!state.selected.inactive}
          text={t('projects.inactiveText')}
          iconName='Warning'
          type={MessageBarType.warning}
        />
      )}
      {state.selected.description && (
        <ReactMarkdown
          className={styles.description}
          source={state.selected.description}
          escapeHtml={false}
        />
      )}
      <div className={styles.labels}>
        {(state.selected.labels as Label[]).map((label, index) => (
          <EntityLabel key={index} label={label} size='medium' />
        ))}
      </div>
      <UserMessage
        hidden={!!state.selected.description || !isEmpty(state.selected.labels)}
        containerStyle={{ margin: '15px 0 15px 0' }}
        text={t('projects.noInformationAvailable')}
        iconName='Info'
      />
      <UserMessage
        hidden={!state.selected.outlookCategory}
        containerStyle={{ margin: '15px 0 15px 0' }}
        text={t('projects.categoryOutlookText')}
        iconName='OutlookLogoInverse'
      />
    </div>
  )
}
