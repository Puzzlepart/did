/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { TooltipHost, useTheme } from '@fluentui/react'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import { UserVacationTooltipContent } from './UserVacationTooltipContent'
import $vacation from './vacation.gql'
import { getFluentIcon } from 'utils'

/**
 * @category UserMenu
 */
export const UserVacation: FC = () => {
  const { t } = useTranslation()
  const { data } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  const { palette } = useTheme()
  return (
    <TooltipHost
      content={<UserVacationTooltipContent {...(data?.vacation ?? {})} />}
    >
      <MenuItem
        style={{ cursor: 'help' }}
        text={t('common.vacationSummaryText', data?.vacation)}
        icon={getFluentIcon('DrinkMargarita')}
        textStyle={{
          color: palette.neutralPrimary
        }}
      />
    </TooltipHost>
  )
}
