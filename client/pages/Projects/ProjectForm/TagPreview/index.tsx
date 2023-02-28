/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ITagPreviewProps } from './types'

/**
 * @category Projects
 */
export const TagPreview: FC<ITagPreviewProps> = ({ projectId, hidden }) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden}>
      <UserMessage
        containerStyle={{ marginTop: 10 }}
        iconName='OutlookLogo'
        text={
          projectId
            ? t('projects.idPreviewText', { projectId })
            : t('projects.idPreviewBlankText')
        }
      />
    </div>
  )
}
