import { SubText } from 'components/SubText'
import { UserMessage } from 'components/UserMessage'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../../context'
import styles from './Information.module.scss'
import { InformationProperty } from './InformationProperty'

/**
 * @category Customers
 */
export const Information: FC = () => {
  const { t } = useTranslation()
  const { state } = useContext(CustomersContext)

  return (
    <div className={styles.root}>
      <SubText text={state.selected?.description} font='medium' />
      {state.selected?.inactive && (
        <UserMessage
          text={t('customers.inactiveText')}
          iconName='Warning'
          type={'warning'}
        />
      )}
      <InformationProperty
        title={t('projects.tagLabel')}
        value={state.selected?.key}
      />
    </div>
  )
}
