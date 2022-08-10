/* eslint-disable tsdoc/syntax */
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label } from 'types'
import { ProjectsContext } from '../../context'
import styles from './Information.module.scss'
import { InformationProperty } from './InformationProperty'

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
      <InformationProperty title={t('common.descriptionFieldLabel')} value={state.selected.description} />
      <InformationProperty title={t('projects.tagLabel')} value={state.selected.tag} />
      {(state.selected?.labels?.length > 0) && (
        <InformationProperty title={t('admin.labels.headerText')}>
          {(state.selected.labels as Label[]).map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </InformationProperty>
      )}
      <UserMessage
        hidden={!state.selected.outlookCategory}
        containerStyle={{ margin: '15px 0 15px 0' }}
        text={t('projects.categoryOutlookText')}
        iconName='OutlookLogoInverse'
      />
    </div>
  )
}
