/* eslint-disable unicorn/consistent-function-scoping */
import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useProjectsContext } from 'pages/Projects/context'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { BaseResult, Project, TimeEntry } from 'types'
import { PROJECT_DELETE_SUCCESS } from '../../../../reducer'
import $deleteProject from './deleteProject.gql'
import { ProjectDeleteDialog } from './ProjectDeleteDialog'
import timeentriesQuery from './timeentries.gql'
import { DialogState } from './types'

/**
 * Custom hook to handle the deletion of a project.
 *
 * This hook manages the state and logic for deleting a project, including
 * checking for associated time entries and displaying appropriate messages
 * in a dialog.
 *
 * @returns An object containing:
 * - `onClick`: A function to initiate the deletion process.
 * - `disabled`: A boolean indicating if the delete action is disabled.
 * - `dialog`: A JSX element representing the delete confirmation dialog.
 */
export function useProjectDeleteAction() {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const location = useLocation()
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
  const [deleteProject] = useMutation<{ result: BaseResult }>($deleteProject)

  /**
   * Handles the deletion of a project.
   *
   * This function performs the following steps:
   * 1. Hides the dialog.
   * 2. Sends a request to delete the project.
   * 3. Displays a toast notification based on the success or failure of the deletion.
   * 4. Refetches the project context if the deletion is successful.
   *
   * @param  project - The project to be deleted.
   *
   * @returns A promise that resolves when the deletion process is complete.
   */
  const onDelete = async (project: Project) => {
    setDialogState('hidden')
    setMessage(null)
    const { data } = await deleteProject({
      variables: {
        projectId: project.tag
      }
    })
    if (!data.result.success) {
      displayToast(t('projects.deleteFailed', project), 'error', 8, {
        headerText: t('projects.deleteFailedTitle')
      })
      return
    }
    await displayToast(t('projects.deleteSuccess', project), 'success', 5, {
      headerText: t('projects.deleteSuccessTitle')
    })
    context.refetch()
    location.pathname = '/projects'
    context.dispatch(PROJECT_DELETE_SUCCESS())
  }

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
          setMessage(
            t('projects.deleteError', { count: query.data.timeEntries.length })
          )
          return
        }
        setDialogState('success')
        setMessage(t('projects.checkSuccess'))
        return
      }
    }
  }, [dialogState, query.loading])

  const dialog = (
    <ProjectDeleteDialog
      project={context.state.selected}
      state={dialogState}
      setState={setDialogState}
      message={message}
      loading={query.loading}
      onDelete={onDelete}
    />
  )

  return {
    onClick: () => setDialogState('initial'),
    disabled: query.loading,
    dialog
  }
}
