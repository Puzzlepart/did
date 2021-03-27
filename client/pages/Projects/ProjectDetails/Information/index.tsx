/* eslint-disable tsdoc/syntax */
import { SubText } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label } from 'types'
import { isEmpty } from 'underscore'
import { ProjectsContext } from '../../context'
import styles from './Information.module.scss'

/**
 * @category Projects
 */
export const Information: React.FC = () => {
  const { t } = useTranslation()
  const { state } = useContext(ProjectsContext)

  return (
    <div className={styles.root}>
      {state.selected.inactive && (
        <UserMessage
          hidden={!state.selected.inactive}
          text={t('projects.inactiveText')}
          iconName='Warning'
          type={'warning'}
        />
      )}
      <SubText
        text={state.selected.description}
        font='medium' />
      <div className={styles.labels}>
        {(state.selected.labels as Label[]).map((label, index) => (
          <EntityLabel key={index} label={label} />
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
