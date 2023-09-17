import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { OutlookCategory, Project } from 'types'

type DATA_UPDTED_PAYLOAD = QueryResult<{
  projects: Project[]
  outlookCategories: OutlookCategory[]
}>

export const DATA_UPDATED = createAction<DATA_UPDTED_PAYLOAD>('DATA_UPDATED')
export const SET_SELECTED_PROJECT = createAction<Project>(
  'SET_SELECTED_PROJECT'
)
