import { environment } from '../utils'
import { renderPage } from './utils'
import path from 'path'
import { Response } from 'express'

const DEFAULT_MAINTENANCE_MESSAGE = 'We\'re currently deploying updates to did. Please check back in a few minutes (or hours if everything goes wrong).'

/**
 * Checks if the application is in maintenance mode based on environment variables.
 *
 * @returns boolean True if maintenance mode is enabled
 */
export const isMaintenanceMode = (): boolean => {
  return environment<boolean>('MAINTENANCE_MODE', null, { isSwitch: true })
}

/**
 * Handles the maintenance mode by rendering a maintenance page.
 * 
 * @param response Response object
 */
export const handleMaintenanceMode = (response: Response) => {
  const message = environment<string>('MAINTENANCE_MESSAGE', DEFAULT_MAINTENANCE_MESSAGE)
  return renderPage(response, path.join(
    __dirname,
    '../public/pages/maintenance'
  ), 503, { message })
}