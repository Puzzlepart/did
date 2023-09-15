/* eslint-disable unicorn/prevent-abbreviations */
/**
 * Main entry point for the App
 *
 * @module /
 */
import { ApolloProvider } from '@apollo/client'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import $date from 'DateUtils'
import i18next from 'i18next'
import React from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { App } from './app'
import { client } from './graphql'
import { fetchUserContext } from './graphql-queries/user'
import './i18n'
import { Themed } from './theme/Themed'

/**
 * Bootstrapping the App
 *
 * * Retrieves context using `fetchUserContext`
 * * Sets up `i18n` with the user language
 * * Sets up `DateUtils` with the user language
 */
export const bootstrap = async () => {
  initializeIcons()
  const context = await fetchUserContext(client)
  $date.setup(context.user.preferredLanguage)
  i18next.changeLanguage(context.user.preferredLanguage)

  render(
    <Themed theme={context.user.theme}>
      <ApolloProvider client={client}>
        <App {...context} />
      </ApolloProvider>
    </Themed>,
    document.querySelector('#app')
  )
}

bootstrap()

export { App } from './app'
