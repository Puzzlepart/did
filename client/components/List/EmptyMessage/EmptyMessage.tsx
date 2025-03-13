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
  const emptyMessage = Boolean(context.props.emptyMessage)
    ? context.props.emptyMessage
    : (context.state.searchTerm?.length > 0
      ? t('common.noResultsWithCriteria', context.state)
      : t('common.noResults'))
  return (
    <div
      className={EmptyMessage.className}
      hidden={
        context.props.enableShimmer ||
        items?.length > 0 ||
        context.props.hideEmptyMessage
      }
    >
      <Markdown text={emptyMessage} />
    </div>
  )
}

EmptyMessage.displayName = 'EmptyMessage'
EmptyMessage.className = styles.emptyMessage
