import { Caption2Strong, mergeClasses } from '@fluentui/react-components'
import { Alert } from '@fluentui/react-components/unstable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { StyledComponent } from 'types'
import s from 'underscore.string'
import { getFluentIcon } from 'utils'
import styles from './ChartTooltip.module.scss'
import { IChartTooltipProps } from './types'
import { useChartTooltip } from './useChartTooltip'

/**
 * Component that renders the tooltip for the pie chart. It is used in the
 * `PieChartContainer` component. Supports `name`, `secondaryText` and `teritaryText`.
 *
 * `secondaryText` and `teritaryText` supports markdown, because why not.
 *
 * @category Timesheet
 */
export const ChartTooltip: StyledComponent<IChartTooltipProps> = (props) => {
  const { t } = useTranslation()
  const {
    shouldRender,
    name,
    secondaryText,
    teritaryText,
    value,
    lineClamp,
    url
  } = useChartTooltip(props)
  if (shouldRender) {
    return (
      <div
        className={mergeClasses(
          ChartTooltip.className,
          lineClamp && styles.lineClamp
        )}
      >
        <div className={styles.name}>
          {name} ({value})
        </div>
        {!s.isBlank(secondaryText) && (
          <div className={styles.secondaryText} title={secondaryText}>
            <ReactMarkdown>{secondaryText}</ReactMarkdown>
          </div>
        )}
        {!s.isBlank(teritaryText) && (
          <div className={styles.teritaryText} title={teritaryText}>
            <ReactMarkdown>{teritaryText}</ReactMarkdown>
          </div>
        )}
        {lineClamp ? (
          <div
            className={styles.footer}
            hidden={s.isBlank(secondaryText) && s.isBlank(teritaryText)}
          >
            <Caption2Strong>
              {t('timesheet.allocation.tooltipDetailsInfoText')}
            </Caption2Strong>
          </div>
        ) : (
          <div
            className={styles.footer}
            hidden={!props.navigationAvailable || s.isBlank(url)}
          >
            <Alert icon={getFluentIcon('WebAsset', { size: 16 })}>
              <Caption2Strong>
                {t('timesheet.allocation.navigateToEntityInfoText')}
              </Caption2Strong>
            </Alert>
          </div>
        )}
      </div>
    )
  }

  return null
}

ChartTooltip.displayName = 'ChartTooltip'
ChartTooltip.className = styles.chartTooltip
