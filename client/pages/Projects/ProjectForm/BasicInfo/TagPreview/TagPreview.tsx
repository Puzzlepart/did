/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMessage } from 'components'
import { useFormContext } from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @category Projects
 */
export const TagPreview: FC = () => {
  const { t } = useTranslation()
  const { model, isEditMode } = useFormContext()
  return (
    <div hidden={isEditMode}>
      <UserMessage
        text={
          model['projectId']
            ? t('projects.idPreviewText', model)
            : t('projects.idPreviewBlankText')
        }
      />
    </div>
  )
}
