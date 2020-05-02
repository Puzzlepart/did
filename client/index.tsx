
import { initializeIcons } from '@uifabric/icons';
import 'core-js/stable';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import 'regenerator-runtime/runtime.js';
import { App } from './app';
import { client } from './graphql';
import * as i18n from './i18n';
import { tryParseJson } from 'utils/tryParseJson';

(async () => {
    initializeIcons();
    await i18n.setup({ en: require('../../resources/en.json') });

    const container = document.getElementById('app');

    const context = tryParseJson(container.attributes.getNamedItem('data-props').value, { user: {} });
    container.attributes.removeNamedItem('data-props');

    console.log(context);

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), document.getElementById('app'));
})();