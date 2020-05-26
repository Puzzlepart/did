/* eslint-disable @typescript-eslint/camelcase */
import { ApolloProvider } from '@apollo/react-common'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import i18n from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import DateUtils from 'utils/date'
import { App } from './App'
import { IAppContext } from './AppContext'
import { client, GET_CURRENT_USER } from './graphql'
import loadTheme from './utils/theme'
import './i18n'
import './_global.scss'

initializeIcons()

client.query<{ currentUser: any }>({ query: GET_CURRENT_USER }).then(({ data }) => {
    const container = document.getElementById('app')
    const context: IAppContext = { user: data.currentUser }
    context.user.userLanguage = context.user.userLanguage || 'en-GB'
    context.user.userTheme = context.user.userTheme || 'light'
    loadTheme(context.user.userTheme)
    document.body.className = `theme-${context.user.userTheme}`

    DateUtils.setup(context.user.userLanguage)
    i18n.changeLanguage(context.user.userLanguage)

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container)
})
