/* eslint-disable unicorn/prevent-abbreviations */
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
import i18next from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { App } from './app'
import { ContextUser, IAppContext } from './AppContext'
import { $usercontext, client } from './graphql'
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
        query: $usercontext,
        fetchPolicy: 'cache-first'
      })
      context.user = new ContextUser(data.user)
      context.subscription = data?.subscription
      context.authProviders = data?.authProviders
      return context
    } catch {
      return { user: new ContextUser() }
    }
  }

  const context = await getContext()
  DateUtils.setup(context.user.preferredLanguage)
  i18next.changeLanguage(context.user.preferredLanguage)

  ReactDom.render(
    <ApolloProvider client={client}>
      <App {...context} />
    </ApolloProvider>,
    document.querySelector('#app')
  )
}

boostrap()

export { App }
