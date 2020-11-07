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
import { client, GET_CONTEXT } from './graphql'
import './i18n'
import './_global.scss'


initializeIcons()

/**
 * Get app context
 */
const getContext = async (): Promise<IAppContext> => {
    const context: IAppContext = {
        user: new ContextUser({ preferredLanguage: 'en-GB' }),
        error: JSON.parse(document.getElementById('app').getAttribute('data-error') || '{}'),
    }
    try {
        const { data } = await client.query<Partial<IAppContext>>({ query: GET_CONTEXT, fetchPolicy: 'cache-first' })
        context.user = new ContextUser(data.user)
        context.subscription = data?.subscription
        return context
    } catch (error) {
        return context
    }
}

getContext().then(context => {
    const container = document.getElementById('app')
    DateUtils.setup(context.user.language)
    i18n.changeLanguage(context.user.language)

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container)
})
