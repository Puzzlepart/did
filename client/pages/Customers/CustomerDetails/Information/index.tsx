import { SubText } from 'components/SubText'
import { UserMessage } from 'components/UserMessage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { CustomersContext } from '../../context'
import styles from './Information.module.scss'
import { InformationProperty } from './InformationProperty'

/**
 * @category Customers
 */
export const Information: StyledComponent = () => {
  const { t } = useTranslation()
  const { state } = useContext(CustomersContext)

  return (
    <div className={Information.className}>
      <SubText text={state.selected?.description} font='medium' />
      {state.selected?.inactive && (
        <UserMessage text={t('customers.inactiveText')} intent='warning' />
      )}
      <InformationProperty
        title={t('projects.tagLabel')}
        value={state.selected?.key}
      />
    </div>
  )
}

Information.displayName = 'Information'
Information.className = styles.information
