/* eslint-disable @typescript-eslint/camelcase */
import { initializeIcons } from '@uifabric/icons';
import 'core-js/stable';
import moment from 'moment';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import 'regenerator-runtime/runtime.js';
import { tryParseJson } from 'utils/tryParseJson';
import { App } from './app';
import { IAppContext } from './AppContext';
import GET_CURRENT_USER from './GET_CURRENT_USER';
import { client } from './graphql';
import * as i18n from './i18n';
import './_global.scss';
initializeIcons();

(async () => {
    const container = document.getElementById('app');
    const context = tryParseJson<IAppContext>(container.attributes.getNamedItem('data-props').value, {});
    container.attributes.removeNamedItem('data-props');

    const { data } = await client.query<{ currentUser: any }>({ query: GET_CURRENT_USER });
    context.user = data.currentUser;
    context.user.userLanguage = context.user.userLanguage || 'en-GB';

    await i18n.setup({
        'en-GB': require('../resources/en-GB.json'),
        'nb': require('../resources/nb.json'),
    }, context.user.userLanguage);

    moment.locale(context.user.userLanguage);


    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container);
})();
