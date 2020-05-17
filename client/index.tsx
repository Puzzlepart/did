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
import GET_CURRENT_USER from './GET_CURRENT_USER'
import { client } from './graphql'
import './i18n'
import './_global.scss'

initializeIcons();

(async () => {
    const container = document.getElementById('app')
    try {
        const { data } = await client.query<{ currentUser: any }>({ query: GET_CURRENT_USER })
        const context: IAppContext = { user: data.currentUser }
        context.user.userLanguage = context.user.userLanguage || 'en-GB'

        DateUtils.setup(context.user.userLanguage)
        i18n.changeLanguage(context.user.userLanguage)

        ReactDom.render((
            <ApolloProvider client={client}>
                <App {...context} />
            </ApolloProvider>
        ), container)
    } catch (error) {}
})()
