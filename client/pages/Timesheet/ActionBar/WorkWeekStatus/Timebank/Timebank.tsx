import {
  Button,
  Field,
  MessageBar,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Slider
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { ITimebankProps } from './types'
import { useTimebank } from './useTimebank'
import { getFluentIcon } from 'utils'
import styles from './Timebank.module.scss'
import { useTranslation } from 'react-i18next'

export const Timebank: FC<ITimebankProps> = (props) => {
  const { t } = useTranslation()
  const { timebankAdjustmentAvailable, state, setState, onUpdateUserTimebank } =
    useTimebank(props)
  return (
    <Popover>
      <PopoverTrigger>{props.children as any}</PopoverTrigger>
      <PopoverSurface className={styles.timebank}>
        <div className={styles.container}>
          <h5 className={styles.header}>{t('timesheet.timebank.header')}</h5>
          <MessageBar
            icon={getFluentIcon('TimeAndWeather')}
            intent={state.currentBalance > 0 ? 'success' : 'warning'}
          >
            {t('timesheet.timebank.balance', { balance: state.currentBalance })}
          </MessageBar>
          {timebankAdjustmentAvailable ? (
            <>
              {props.hours > 0 && (
                <Field
                  label={t('timesheet.timebank.balanceAdjustmentLabel', state)}
                  hint={t('timesheet.timebank.balanceAdjustmentHint')}
                >
                  <Slider
                    min={1}
                    max={props.hours}
                    step={0.25}
                    value={state.balanceAdjustment}
                    onChange={(_, { value }) =>
                      setState((previousState) => ({
                        ...previousState,
                        balanceAdjustment: value as number
                      }))
                    }
                  />
                </Field>
              )}
              <div className={styles.actions}>
                {props.hours > 0 ? (
                  <Button
                    appearance='primary'
                    onClick={() => onUpdateUserTimebank()}
                  >
                    {t('timesheet.timebank.incrementTimebankText', state)}
                  </Button>
                ) : (
                  <Button
                    appearance='primary'
                    onClick={() => onUpdateUserTimebank()}
                  >
                    {t('timesheet.timebank.decrementTimebankText', {
                      balanceAdjustment: state.balanceAdjustment * -1
                    })}
                  </Button>
                )}
                <Button
                  disabled
                  appearance='secondary'
                  onClick={() => onUpdateUserTimebank(true)}
                >
                  {t('timesheet.timebank.resetTimebankText')}
                </Button>
              </div>
            </>
          ) : (
            <div hidden={state.isTimebankAdjusted}>
              <MessageBar intent='warning'>
                {t('timesheet.timebank.balanceAdjustmentNotAvailable')}
              </MessageBar>
            </div>
          )}
        </div>
      </PopoverSurface>
    </Popover>
  )
}

Timebank.displayName = 'WorkWeekStatus'
