/* eslint-disable @typescript-eslint/camelcase */
import { ApolloProvider } from '@apollo/react-common'
import { initializeIcons } from '@uifabric/icons'
import 'core-js/stable'
import i18n from 'i18next'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'regenerator-runtime/runtime.js'
import { contains } from 'underscore'
import dateUtils from 'utils/date'
import { supportedLanguages } from '../resources'
import { App } from './App'
import { IAppContext } from './AppContext'
import { client, GET_CURRENT_USER } from './graphql'
import './i18n'
import './_global.scss'

initializeIcons()

/**
 * Get app context
 */
const getContext = async (): Promise<IAppContext> => {
    const context: IAppContext = {}
    try {
        const { data } = await client.query({ query: GET_CURRENT_USER })
        context.user = data?.currentUser
        let { preferredLanguage } = context.user
        preferredLanguage = contains(supportedLanguages, preferredLanguage) ? preferredLanguage : 'en-GB'
        context.user.preferredLanguage = preferredLanguage
        context.hasPermission = (permissionId: string) => contains(context.user?.role?.permissions, permissionId)
        return context
    } catch (error) {
        context.user = { preferredLanguage: 'en-GB' }
        context.hasPermission = () => false
        return context
    }
}

getContext().then(context => {
    const container = document.getElementById('app')
    dateUtils.setup(context.user.preferredLanguage)
    i18n.changeLanguage(context.user.preferredLanguage)

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container)
})
