/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useTheme } from '@fluentui/react'
import { Tooltip } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { MenuItem } from '../MenuItem'
import { UserVacationTooltipContent } from './UserVacationTooltipContent'
import $vacation from './vacation.gql'

/**
 * @category UserMenu
 */
export const UserVacation: FC = () => {
  const { t } = useTranslation()
  const { data } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  const { palette } = useTheme()
  return (
    <Tooltip
      relationship='description'
      content={<UserVacationTooltipContent {...(data?.vacation ?? {})} />}
    >
      <MenuItem
        style={{ cursor: 'help' }}
        text={t('common.vacationSummaryText', data?.vacation)}
        icon={icon('DrinkMargarita')}
        textStyle={{
          color: palette.neutralPrimary,
          padding: '0 0 0 10px'
        }}
      />
    </Tooltip>
  )
}
