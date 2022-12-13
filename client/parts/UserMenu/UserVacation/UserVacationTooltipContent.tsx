/* eslint-disable tsdoc/syntax */
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const UserVacationTooltipContent: FC<any> = (props) => {
  const { t } = useTranslation()
  switch (props.calculationType) {
    case 'planned':
      return <span>{t('common.vacationSummaryTooltip', props)}</span>
    case 'confirmed':
      return <span>{t('common.vacationSummaryTooltipConfirmed', props)}</span>
  }
}
