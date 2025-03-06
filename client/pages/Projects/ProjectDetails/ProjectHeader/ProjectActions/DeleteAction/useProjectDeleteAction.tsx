/* eslint-disable unicorn/consistent-function-scoping */
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, DialogTrigger, ProgressBar, Field } from '@fluentui/react-components'
import { Markdown, UserMessage } from 'components'
import { useProjectsContext } from 'pages/Projects/context'
import React, { useEffect, useState } from 'react'
import timeentriesQuery from './timeentries.gql'
import { useQuery } from '@apollo/client'
import { TimeEntry } from 'types'
import { useTranslation } from 'react-i18next'
import { DialogState } from './types'

export function useProjectDeleteAction() {
    const { t } = useTranslation()
    const context = useProjectsContext()
    const [dialogState, setDialogState] = useState<DialogState>('hidden')
    const [message, setMessage] = useState<string>()
    const query = useQuery<{
        timeEntries: TimeEntry[]
    }>(timeentriesQuery, {
        variables: {
            query: { projectId: context.state.selected?.tag }
        },
        skip: !context.state.selected || dialogState !== 'checking'
    })

    useEffect(() => {
        switch (dialogState) {
            case 'checking': {
                if (query.loading) return
                if (query.error) {
                    setDialogState('error')
                    setMessage(query.error.message)
                    return
                }
                if (query.data.timeEntries.length > 0) {
                    setDialogState('error')
                    setMessage(t('projects.deleteError', { count: query.data.timeEntries.length }))
                    return
                }
                setDialogState('success')
                setMessage(t('projects.checkSuccess'))
                return
            }
        }
    }, [dialogState, query.loading])

    const dialog = (
        <Dialog open={['initial', 'checking', 'error', 'success'].includes(dialogState)}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{t('projects.deleteDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <div hidden={dialogState !== 'initial'}>
                            <Markdown text={t('projects.deleteConfirmation', context.state.selected)} />
                        </div>
                        <div hidden={dialogState !== 'checking'}>
                            <Field
                                label={t('projects.deleteCheckLabel')}
                                hint={t('projects.deleteCheckHint')}>
                                <ProgressBar />
                            </Field>
                        </div>
                        <div hidden={!['error', 'success'].includes(dialogState)}>
                            <UserMessage intent='info'>
                                {message}
                            </UserMessage>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            appearance='primary'
                            disabled={query.loading || dialogState === 'error'}
                            onClick={() => setDialogState('checking')}
                        >{dialogState === 'success'
                            ? t('projects.deleteButtonLabel')
                            : t('projects.checkButtonLabel')}</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button
                                appearance='secondary'
                                disabled={query.loading}
                                onClick={() => setDialogState('hidden')}>
                                {t('common.abort')}
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )

    return { onClick: () => setDialogState('initial'), disabled: false, dialog }
}
