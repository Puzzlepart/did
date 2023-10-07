import { GraphQLRequestContext } from '@apollo/server'
import 'reflect-metadata'
import UAParser from 'ua-parser-js'
import _ from 'underscore'
import { RequestContext } from './requestContext'

/**
 * Specify this function to provide Apollo Studio with client details
 * for each processed request. Apollo Studio uses this information to
 * segment metrics by client. This function is passed a GraphQLRequestContext
 * object containing all available information about the request. It should
 * return an object with clientName and clientVersion fields that i
 * dentify the associated client.
 *
 * By default, the plugin attempts to obtain these values from the incoming
 * request's HTTP headers (specifically, apollographql-client-name and apollographql-client-version).
 *
 * @see https://www.apollographql.com/docs/apollo-server/api/plugin/usage-reporting/#generateclientinfo
 *
 * @remarks For now we're fetching browser info using ua-parser-js, aswell as checking
 * for Postman, Azure Logic Apps and Microsoft Flow.
 *
 * @param context - Context
 */

export function generateClientInfo({
  request
}: GraphQLRequestContext<RequestContext>) {
  const userAgent = request.http.headers.get('user-agent') || ''
  if (_.isEmpty(userAgent)) return null
  if (userAgent.indexOf('PostmanRuntime') === 0) {
    const [, clientVersion] = userAgent.split('/')
    return { clientName: 'Postman Runtime', clientVersion }
  }
  const parts = userAgent.split(' ')
  if (userAgent.includes('microsoft-flow')) {
    const part = _.find(parts, (p) => p.includes('microsoft-flow'))
    const [, clientVersion] = part.split('/')
    return { clientName: 'Microsoft Flow', clientVersion }
  }
  if (userAgent.includes('azure-logic-apps')) {
    const part = _.find(parts, (p) => p.includes('azure-logic-apps'))
    const [, clientVersion] = part.split('/')
    return { clientName: 'Azure Logic Apps', clientVersion }
  }
  const browser = new UAParser(userAgent).getBrowser()
  return { clientName: browser.name, clientVersion: browser.version }
}
