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
import { enableMapSet } from 'immer'
import React from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { App } from './app'
import { client } from './graphql-client'
import { fetchSessionContext } from './graphql-queries/session'
import './i18n'

// Enable the MapSet plugin
enableMapSet()

/**
 * Bootstrapping the App
 *
 * * Retrieves context using `fetchUserContext`
 * * Sets up `i18n` with the user language
 * * Sets up `DateUtils` with the user language
 */
export const bootstrap = async () => {
  initializeIcons(ICONS_BASE_URL)
  const sessionContext = await fetchSessionContext(client)
  $date.setup(sessionContext.user.preferredLanguage)
  i18next.changeLanguage(sessionContext.user.preferredLanguage)

  render(
    <ApolloProvider client={client}>
      <App sessionContext={sessionContext} />
    </ApolloProvider>,
    document.querySelector('#app')
  )
}

bootstrap()

export { App } from './app'
