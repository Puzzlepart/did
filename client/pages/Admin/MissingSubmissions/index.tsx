/* eslint-disable tsdoc/syntax */
import { Pivot, PivotItem } from '@fluentui/react'
import { TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MissingSubmissionUser } from './MissingSubmissionUser'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { t } = useTranslation()
  const { periods, users } = useMissingSubmissions()
  return (
    <>
      <Pivot defaultSelectedKey='all'>
        <PivotItem itemKey='all' headerText={t('common.allWeeks')}>
          {users.map((user, index) => (
            <MissingSubmissionUser key={index} user={user} />
          ))}
        </PivotItem>
        {periods.map((period, index) => (
          <PivotItem
            key={index}
            itemKey={period.id}
            headerText={t('common.periodName', { name: period.name })}
          >
            {period.users.map((user, index) => (
              <MissingSubmissionUser key={index} user={user} period={period} />
            ))}
          </PivotItem>
        ))}
      </Pivot>
    </>
  )
}