import { Caption2, Option } from '@fluentui/react-components'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { UserPickerContext } from './context'

export const FreeformOption: FC = () => {
  const { t } = useTranslation()
  const context = useContext(UserPickerContext)
  if(!context.state.searchTerm) return null
  return (
    <Option
      key='freeform'
      text={context.state.searchTerm}
      title={t('components.userPicker.clearSearch')}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        context.setState({ searchTerm: '' })
      }}
    >
      <Caption2>
        {t('components.userPicker.searchTerm', {
          searchTerm: context.state.searchTerm
        })}
      </Caption2>
    </Option>
  )
}