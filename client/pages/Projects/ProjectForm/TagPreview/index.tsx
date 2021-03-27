/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import React, { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

interface ITagPreviewProps extends Pick<HTMLAttributes<HTMLDivElement>, 'hidden'> {
  projectId?: string
}

/**
 * @category Projects
 */
export const TagPreview: React.FC<ITagPreviewProps> = ({ projectId, hidden }) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden}>
      <UserMessage
        containerStyle={{ marginTop: 10 }}
        iconName='OutlookLogo'
        text={!projectId
          ? t('projects.idPreviewBlankText')
          : t('projects.idPreviewText', { projectId })}
      />
    </div>
  )
}
