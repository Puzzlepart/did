/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
/**
 * Main entry point for the App
 *
 * @module /
 */
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@fluentui/react'
import { initializeIcons } from '@uifabric/icons'
import { IAppProps } from 'app/types'
import 'core-js/stable'
import $date from 'DateUtils'
import i18next from 'i18next'
import React from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { getTheme } from 'theme'
import { App, ContextUser } from './app'
import { $usercontext, client } from './graphql'
import './i18n'
import { lightTheme } from './theme'

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
   * Initialize app
   */
  const initializeApp = async (): Promise<IAppProps> => {
    const _: IAppProps = {}
    try {
      const { data } = await client.query<Partial<IAppProps>>({
        query: $usercontext,
        fetchPolicy: 'cache-first'
      })
      _.user = new ContextUser(data.user)
      _.subscription = data?.subscription
      _.authProviders = data?.authProviders
      return _
    } catch {
      return { user: new ContextUser() }
    }
  }

  const init = await initializeApp()
  $date.setup(init.user.preferredLanguage)
  i18next.changeLanguage(init.user.preferredLanguage)

  render(
    <ThemeProvider applyTo='body' theme={getTheme(init.user.configuration?.ui?.theme)}>
      <ApolloProvider client={client}>
        <App {...init} />
      </ApolloProvider>
    </ThemeProvider>,
    document.querySelector('#app')
  )
}

boostrap()

export { App }
