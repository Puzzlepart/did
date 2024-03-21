import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { Field } from '../../Field'
import styles from './DateField.module.scss'
import { IDateFieldProps } from './types'
import { DayOfWeek } from '@fluentui/react'
import { useTranslation } from 'react-i18next'

/**
 * A reusable component that renders a date field.
 */
export const DateField: ReusableComponent<IDateFieldProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Field
      className={DateField.className}
      {..._.pick(props, 'name', 'label', 'description', 'required', 'hidden')}
    >
      <DatePicker
        {...(props as DatePickerProps)}
        formatDate={(date) => date.toLocaleDateString()}
        firstDayOfWeek={DayOfWeek.Monday}
        highlightCurrentMonth
        showGoToToday
        showCloseButton
        strings={t('common.datePicker', { returnObjects: true })}
      />
    </Field>
  )
}

DateField.className = styles.dateField
DateField.defaultProps = {
  allowTextInput: false
}
