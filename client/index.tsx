import { ApolloProvider } from '@apollo/client'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import i18n from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import DateUtils from 'utils/date'
import { App } from './App'
import { ContextUser, IAppContext } from './AppContext'
import { client, $context } from './graphql'
import './i18n'
import './_global.scss'

/**
 * Bootstrapping the App
 *
 * * Retrieves context using GraphQL query GET_CONTEXT
 * * Sets up i18n with the user language
 * * Sets up DateUtils with the user language
 */
const boostrap = async () => {
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
    } catch (error) {
      // We return an "empty" user with preferred language en-GB (defaultlt)
      return { user: new ContextUser() }
    }
  }

  const context = await getContext()
  context.error = JSON.parse(document.getElementById('app').getAttribute('data-error') || '{}')
  const container = document.getElementById('app')
  DateUtils.setup(context.user.language)
  i18n.changeLanguage(context.user.language)

  ReactDom.render(
    <ApolloProvider client={client}>
      <App {...context} />
    </ApolloProvider>,
    container
  )
}

boostrap()
