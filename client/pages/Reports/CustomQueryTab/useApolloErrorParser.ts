import { ApolloError } from '@apollo/client'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook that returns a function to parse Apollo errors and translate them into user-friendly error messages.
 *
 * @returns A function that takes an ApolloError and returns a translated Error object.
 *
 * The returned function:
 * - Translates the generic Apollo error name and message using the `useTranslation` hook.
 * - Checks if the error message is 'Maximum call stack size exceeded' and translates it accordingly.
 * - Creates and returns a new Error object with the translated name and message.
 *
 * @example
 * const parseError = useApolloErrorParser();
 * const error = parseError(apolloError);
 * console.error(error.name, error.message);
 */
export function useApolloErrorParser() {
  const { t } = useTranslation()
  return (e: ApolloError) => {
    if (!e) return null
    let name = t('reports.apollo.genericErrorName')
    let message = t('reports.apollo.genericErrorMesssage')
    if (e.message === 'Maximum call stack size exceeded') {
      name = t('reports.apollo.maximumCallStackSizeExceededName')
      message = t('reports.apollo.maximumCallStackSizeExceededMessage')
    }
    const error = new Error(message)
    error.name = name
    return error
  }
}
