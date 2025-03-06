import { Markdown } from 'components/Markdown'
import React from 'react'
import { StyledComponent } from 'types'
import { useListContext } from '../context'
import { IListProps } from '../types'
import styles from './EmptyMessage.module.scss'
import { useTranslation } from 'react-i18next'

export const EmptyMessage: StyledComponent<Pick<IListProps, 'items'>> = ({
  items
}) => {
  const { t } = useTranslation()
  const context = useListContext()

  return (
    <div
      className={EmptyMessage.className}
      hidden={context.props.enableShimmer || items?.length > 0}
    >
      <Markdown
        text={
          context.state.searchTerm?.length > 0
            ? t('projects.noProjectResults', context.state)
            : t('projects.noProjects')
        }
      />
    </div>
  )
}

EmptyMessage.displayName = 'EmptyMessage'
EmptyMessage.className = styles.emptyMessage
