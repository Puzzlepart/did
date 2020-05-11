/* eslint-disable @typescript-eslint/camelcase */
import { ApolloProvider } from '@apollo/react-common';
import { initializeIcons } from '@uifabric/icons';
import 'core-js/stable';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import 'regenerator-runtime/runtime.js';
import DateUtils from 'utils/date';
import { tryParseJson } from 'utils/tryParseJson';
import { App } from './App';
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



    DateUtils.setup(context.user.userLanguage);


    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container);
})();
