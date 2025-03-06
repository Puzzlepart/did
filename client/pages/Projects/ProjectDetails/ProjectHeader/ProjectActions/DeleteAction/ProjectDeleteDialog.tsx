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
    FieldProps,
    ProgressBar
} from '@fluentui/react-components'
import { Markdown } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
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
    project,
    state,
    setState,
    message,
    loading,
    onDelete
}) => {
    const { t } = useTranslation()

    const isIntial = state === 'initial'
    const isChecking = state === 'checking'
    const isError = state === 'error'
    const isSuccess = state === 'success'

    return (
        <Dialog open={state !== 'hidden'}>
            <DialogSurface className={styles.projectDeleteDialog}>
                <DialogBody>
                    <DialogTitle>{t('projects.deleteDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <div hidden={state !== 'initial'}>
                            <Markdown
                                text={t('projects.deleteConfirmation', {
                                    ...project,
                                    name: project?.name?.trim(),
                                    customer: project?.customer?.name?.trim()
                                })}
                            />
                        </div>
                        <div
                            className={styles.checkProgress}
                            style={{ display: isIntial ? 'none' : 'flex' }}
                        >
                            {getFluentIcon('Timer', { size: 60 })}
                            <Field
                                className={styles.field}
                                label={t('projects.deleteCheckLabel')}
                                hint={isChecking && t('projects.deleteCheckHint')}
                                validationState={
                                    (isChecking ? 'none' : state) as FieldProps['validationState']
                                }
                                validationMessage={message}
                            >
                                <ProgressBar value={isChecking ? undefined : 1} />
                            </Field>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            appearance='primary'
                            disabled={loading || isError}
                            onClick={() => {
                                if (isSuccess) onDelete(project)
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
