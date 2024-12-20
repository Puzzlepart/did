import { Tag } from '@fluentui/react-tags-preview'
import { EntityLabel, InformationProperty, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { LabelObject as Label, StyledComponent } from 'types'
import _ from 'underscore'
import { useCustomersContext } from '../../context'
import styles from './CustomerInformation.module.scss'

/**
 * Shows details about the selected customer.
 *
 * @category Customers
 */
export const CustomerInformation: StyledComponent = () => {
  const { t } = useTranslation()
  const context = useCustomersContext()

  return (
    <div className={CustomerInformation.className}>
      <InformationProperty
        hidden={!context.state.selected?.description}
        title={t('common.descriptionFieldLabel')}
        value={context.state.selected?.description}
        onRenderValue={(value) => <ReactMarkdown>{value}</ReactMarkdown>}
        isDataLoaded={!context.loading}
      />
      <InformationProperty
        title={t('projects.tagLabel')}
        value={context.state.selected?.key}
        onRenderValue={(value) => <Tag size='medium'>{value}</Tag>}
        isDataLoaded={!context.loading}
      />
      {!_.isEmpty(context.state.selected?.labels) && (
        <InformationProperty
          title={t('common.labelsText')}
          isDataLoaded={!context.loading}
        >
          {(context.state.selected?.labels as Label[]).map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </InformationProperty>
      )}
      <UserMessage
        hidden={!context.state.selected?.inactive}
        text={t('customers.inactiveText')}
        intent='warning'
      />
    </div>
  )
}

CustomerInformation.displayName = 'CustomerInformation'
CustomerInformation.className = styles.customerInformation
