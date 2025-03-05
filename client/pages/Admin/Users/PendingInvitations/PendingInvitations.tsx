import {
  Badge,
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  Spinner,
  Text
} from '@fluentui/react-components'
import {
  CalendarRegular,
  MailRegular,
  ShieldLockRegular
} from '@fluentui/react-icons'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './PendingInvitations.module.scss'
import { usePendingInvitations } from './usePendingInvitations'
import date from 'DateUtils'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'

export const PendingInvitations: StyledComponent = () => {
  const {t} = useTranslation()
  const { invitations, loading, cancelInvitation } =
    usePendingInvitations()

  if (loading) {
    return <Spinner />
  }

  if (_.isEmpty(invitations)) {
    return (
      <div>
        <h4>{t('admin.users.noPendingInvitations')}</h4>
      </div>
    )
  }

  return (
    <div className={PendingInvitations.className}>
      <div className={styles.cardsContainer}>
        {invitations.map((invitation) => (
          <Card key={invitation.id} className={styles.card}>
            <CardHeader
              className={styles.cardHeader}
              header={
                <Text weight='semibold'>
                  {invitation.name || invitation.mail.split('@')[0]}
                </Text>
              }
              action={
                <Badge
                  appearance='filled'
                  color={invitation.status === 'pending' ? 'warning' : 'danger'}
                >
                  {invitation.status === 'pending' ? t('common.pending') : t('common.expired')}
                </Badge>
              }
            />
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <MailRegular />
                <Body1>{invitation.mail}</Body1>
              </div>
              {invitation.role && (
                <div className={styles.infoRow}>
                  <ShieldLockRegular />
                  <Body1>{invitation.role}</Body1>
                </div>
              )}
              <div className={styles.infoRow}>
                <CalendarRegular />
                <Caption1>
                  {t('admin.users.invitedString', {invitedAt: date.formatDate(invitation.invitedAt, 'LLL')})}
                </Caption1>
              </div>
            </div>
            <div className={styles.actions}>
              <Button
              icon={getFluentIcon('PersonDelete')}
                appearance='subtle'
                onClick={() => cancelInvitation(invitation.id)}
              >
                {t('admin.users.cancelInvitation')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

PendingInvitations.displayName = 'PendingInvitations'
PendingInvitations.className = styles.pendingInvitations
