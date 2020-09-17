/* eslint-disable @typescript-eslint/camelcase */
import { ApolloProvider } from '@apollo/react-common'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import i18n from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { contains } from 'underscore'
import DateUtils from 'utils/date'
import { App } from './App'
import { IAppContext } from './AppContext'
import { client, GET_CURRENT_USER } from './graphql'
import './i18n'
import './_global.scss'
import { supportedLanguages } from '../resources'

initializeIcons()

client.query<{ currentUser: any }>({ query: GET_CURRENT_USER }).then(({ data }) => {
    const container = document.getElementById('app')
    const context: IAppContext = { user: data?.currentUser }
    let { preferredLanguage } = context.user
    preferredLanguage = contains(supportedLanguages, preferredLanguage) ? preferredLanguage : 'en-GB'
    context.user.preferredLanguage = preferredLanguage
    context.hasPermission = (permissionId: string) => contains(context.user?.role?.permissions, permissionId)

    DateUtils.setup(preferredLanguage)
    i18n.changeLanguage(preferredLanguage)

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container)
})
