
import { initializeIcons } from '@uifabric/icons';
import { IAppContext } from 'AppContext';
import 'core-js/stable';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import 'regenerator-runtime/runtime.js';
import { tryParseJson } from 'utils/tryParseJson';
import { App } from './app';
import { client } from './graphql';
import * as i18n from './i18n';

(async () => {
    initializeIcons();
    await i18n.setup({ en: require('../resources/en.json') });

    const container = document.getElementById('app');

    const context = tryParseJson<IAppContext>(container.attributes.getNamedItem('data-props').value, { user: {} });
    container.attributes.removeNamedItem('data-props');

    context.user.userLanguage = 'nb_no';

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), document.getElementById('app'));
})();
