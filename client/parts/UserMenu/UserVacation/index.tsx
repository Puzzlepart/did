/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useTheme } from '@fluentui/react'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import $vacation from './vacation.gql'

/**
 * @category UserMenu
 */
export const UserVacation: FC = () => {
  const { t } = useTranslation()
  const { data } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  const { palette } = useTheme()
  return (
    <MenuItem
      iconProps={{ iconName: 'Vacation' }}
      title={t('common.vacationSummaryTooltip', data?.vacation)}
      text={t('common.vacationSummaryText', data?.vacation)}
      textStyle={{
        color: palette.neutralPrimary
      }}
    />
  )
}
