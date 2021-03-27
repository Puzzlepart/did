/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable tsdoc/syntax */
import { IToggleProps, Toggle } from '@fluentui/react'
import { SubText } from 'components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IOutlookCategoryInputProps extends IToggleProps {
  model: any
}

/**
 * @category Projects
 */
export const OutlookCategoryInput: ReusableComponent<IOutlookCategoryInputProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div>
      <Toggle
        label={t('projects.createOutlookCategoryFieldLabel')} 
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}/>
      <SubText
        text={t('projects.createOutlookCategoryFieldDescription', { id: 'TEST' })}
      />
    </div>
  )
}
