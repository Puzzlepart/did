import {
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary
} from '@fluentui/react-tags-preview'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { getFluentIcon, getFluentIconWithFallback } from 'utils'
import styles from './ProjectTag.module.scss'
import { IProjectTagProps } from './types'
import { useProjectTag } from './useProjectTag'
import ReactMarkdown from 'react-markdown'

/**
 * A tag for a project. The tag can be copied to the clipboard and favorited.
 * 
 * @category Reusable Component
 */
export const ProjectTag: ReusableComponent<IProjectTagProps> = (props) => {
  const { t } = useTranslation()
  const { hasOutlookCategory, addOutlookCategory, onTagCopied, colorPresets } =
    useProjectTag(props)
  return (
    <InteractionTag className={ProjectTag.className} size={props.size}>
      <CopyToClipboard text={props.project?.tag} onCopy={onTagCopied}>
        <InteractionTagPrimary
          hasSecondaryAction={props.enableFavoriting}
          icon={
            props.displayIcon && getFluentIconWithFallback(props.project.icon)
          }
        >
          <span>{props.project?.tag}</span>
        </InteractionTagPrimary>
      </CopyToClipboard>
      {props.enableFavoriting && (
        <Popover>
          <PopoverTrigger>
            <InteractionTagSecondary
              style={{ cursor: hasOutlookCategory ? 'auto' : 'pointer' }}
            >
              {getFluentIcon('Heart', {
                bundle: true,
                filled: hasOutlookCategory,
                color: '#FF4033'
              })}
            </InteractionTagSecondary>
          </PopoverTrigger>
          {hasOutlookCategory ? (
            <PopoverSurface>
              <ReactMarkdown linkTarget='_blank'>
                {t('common.outlookCategoryRemove', props)}
              </ReactMarkdown>
            </PopoverSurface>
          ) : (
            <PopoverSurface>
              <div className={styles.colorPresets}>
                <div className={styles.container}>
                  {colorPresets.map(([colorHex, colorName], index) => (
                    <div
                      key={index}
                      title={t('common.outlookCategoryAdd', { colorName })}
                      className={styles.preset}
                      style={{ backgroundColor: colorHex }}
                      onClick={() => addOutlookCategory(index + 1)}
                    ></div>
                  ))}
                </div>
              </div>
            </PopoverSurface>
          )}
        </Popover>
      )}
    </InteractionTag>
  )
}

ProjectTag.displayName = 'ProjectLink'
ProjectTag.className = styles.projectTag
ProjectTag.defaultProps = {
  size: 'medium',
  outlookCategoriesHref:
    'https://outlook.office.com/mail/options/general/categories'
}
