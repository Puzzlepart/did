import { t9r } from './t9r'

/**
 * Creates a router link by replacing variables in a link template with their corresponding values.
 *
 * @param linkTemplate - The link template with variables to replace.
 * @param variables - An object containing key-value pairs of variable names and their corresponding values.
 *
 * @returns The router link with variables replaced and converted to lowercase.
 */
export function createRouterLink(linkTemplate: string, variables: object) {
  return t9r(linkTemplate, variables ?? {}).toLowerCase()
}
