/* eslint-disable tsdoc/syntax */
/**
 * Main entry point for the App
 *
 * @module .
 */
import { ApolloProvider } from '@apollo/client'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import DateUtils from 'DateUtils'
import index18n from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { App } from './App'
import { ContextUser, IAppContext } from './AppContext'
import { $context, client } from './graphql'
import './i18n'

/**
 * Bootstrapping the App
 *
 * * Retrieves context using GraphQL query GET_CONTEXT
 * * Sets up i18n with the user language
 * * Sets up DateUtils with the user language
 */
export const boostrap = async () => {
  initializeIcons()

  /**
   * Get app context
   */
  const getContext = async (): Promise<IAppContext> => {
    const context: IAppContext = {}
    try {
      const { data } = await client.query<Partial<IAppContext>>({
        query: $context,
        fetchPolicy: 'cache-first'
      })
      context.user = new ContextUser(data.user)
      context.subscription = data?.subscription
      return context
    } catch {
      // We return an "empty" user with preferred language en-GB (default)
      return { user: new ContextUser() }
    }
  }

  const context = await getContext()
  DateUtils.setup(context.user.language)
  index18n.changeLanguage(context.user.language)

  ReactDom.render(
    <ApolloProvider client={client}>
      <App {...context} />
    </ApolloProvider>,
    document.querySelector('#app')
  )
}

boostrap()

export { App }
