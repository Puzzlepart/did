import { useQuery } from '@apollo/client'
import { useTheme } from '@fluentui/react'
import { Skeleton, SkeletonItem, Tooltip } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import { UserVacationTooltipContent } from './UserVacationTooltipContent'
import $vacation from './vacation.gql'

/**
 * @category UserMenu
 */
export const UserVacation: FC = () => {
  const { t } = useTranslation()
  const { data, loading } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  const { palette } = useTheme()
  return (
    <Skeleton>
      <Tooltip
        relationship='description'
        content={<UserVacationTooltipContent {...(data?.vacation ?? {})} />}
      >
        {loading ? (
          <Skeleton>
            <SkeletonItem style={{ height: 28 }} />
          </Skeleton>
        ) : (
          <MenuItem
            style={{ cursor: 'help' }}
            text={t('common.vacationSummaryText', data?.vacation)}
            textStyle={{
              color: palette.neutralPrimary,
              padding: '0 0 0 10px',
              fontSize: 12
            }}
          />
        )}
      </Tooltip>
    </Skeleton>
  )
}
