/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMessage } from 'components'
import { useFormContext } from 'components/FormControl'
import React, { FC, HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @category Projects
 */
export const TagPreview: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { t } = useTranslation()
  const { model } = useFormContext()
  return (
    <div hidden={props.hidden}>
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
