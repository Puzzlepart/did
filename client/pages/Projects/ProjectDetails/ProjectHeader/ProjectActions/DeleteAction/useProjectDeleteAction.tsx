/* eslint-disable unicorn/consistent-function-scoping */
import { useMutation, useQuery } from '@apollo/client'
import { useProjectsContext } from 'pages/Projects/context'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import { ProjectDeleteDialog } from './ProjectDeleteDialog'
import timeentriesQuery from './timeentries.gql'
import $deleteProject from './deleteProject.gql'
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
  const [deleteProject] = useMutation($deleteProject)

  const onDelete = async () => {
    const { data } = await deleteProject({
      variables: {
        projectId: context.state.selected?.tag
      }
    })
    // eslint-disable-next-line no-console
    console.log(data.result)
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
