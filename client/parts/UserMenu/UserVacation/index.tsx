/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import $vacation from './vacation.gql'

/**
 * @category UserMenu
 */
export const UserVacation: React.FC = () => {
  const { t } = useTranslation()
  const { data } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  return (
    <MenuItem
      iconProps={{ iconName: 'Vacation' }}
      text={t('common.vacationSummaryText', data?.vacation)}
    />
  )
}
