/* eslint-disable unicorn/consistent-function-scoping */
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    ProgressBar
} from '@fluentui/react-components'
import { Markdown, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { useProjectsContext } from '../../../../context'
import styles from './ProjectDeleteDialog.module.scss'
import { IProjectDeleteDialogProps } from './types'

/**
 * Component for displaying a dialog to confirm the deletion of a project.
 *
 * @param props - The properties for the ProjectDeleteDialog component.
 *
 * @returns The rendered ProjectDeleteDialog component.
 */
export const ProjectDeleteDialog: FC<IProjectDeleteDialogProps> = ({
    state,
    setState,
    message,
    loading,
    onDelete
}) => {
    const { t } = useTranslation()
    const context = useProjectsContext()

    return (
        <Dialog open={['initial', 'checking', 'error', 'success'].includes(state)}>
            <DialogSurface className={styles.projectDeleteDialog}>
                <DialogBody>
                    <DialogTitle>{t('projects.deleteDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <div hidden={state !== 'initial'}>
                            <Markdown
                                text={t('projects.deleteConfirmation', {
                                    ...context.state.selected,
                                    customer: context.state.selected?.customer?.name
                                })}
                            />
                        </div>
                        <div className={styles.checkProgress} style={{ display: state === 'checking' ? 'flex' : 'none' }}>
                            {getFluentIcon('Timer2', {size: 60})}
                            <Field
                                label={t('projects.deleteCheckLabel')}
                                hint={t('projects.deleteCheckHint')}
                            >
                                <ProgressBar />
                            </Field>
                        </div>
                        <div hidden={!['error', 'success'].includes(state)}>
                            <UserMessage intent='info'>{message}</UserMessage>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            appearance='primary'
                            disabled={loading || state === 'error'}
                            onClick={() => {
                                if (state === 'success') onDelete()
                                else setState('checking')
                            }}
                        >
                            {state === 'success'
                                ? t('projects.deleteButtonLabel')
                                : t('projects.checkButtonLabel')}
                        </Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button
                                appearance='secondary'
                                disabled={loading}
                                onClick={() => setState('hidden')}
                            >
                                {t('common.abort')}
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}
