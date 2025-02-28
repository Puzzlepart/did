import { Checkbox } from '@fluentui/react-components'
import { SubText, useFormContext } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './CreateOutlookCategory.module.scss'

/**
 * @category Projects
 */
export const CreateOutlookCategory: StyledComponent = () => {
  const { t } = useTranslation()
  const { model, isEditMode, additionalContext } = useFormContext()
  const options = additionalContext.get('options')
  return (
    <div className={CreateOutlookCategory.className} hidden={isEditMode}>
      <Checkbox
        label={t('projects.createOutlookCategoryFieldLabel')}
        checked={options.value('createOutlookCategory')}
        onChange={(_event, data) =>
          options.set('createOutlookCategory', data?.checked ?? false)
        }
      />
      <SubText
        text={t('projects.createOutlookCategoryFieldDescription', {
          id: model['projectId'] ? `**${model['projectId']}**` : ''
        })}
      />
    </div>
  )
}

CreateOutlookCategory.displayName = 'CreateOutlookCategory'
CreateOutlookCategory.className = styles.createOutlookCategory
