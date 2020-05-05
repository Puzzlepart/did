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


    await i18n.setup({
        en: require('../resources/en.json'),
        nb_no: require('../resources/nb_no.json'),
    }, context.user.userLanguage);

    if (context.user.userLanguage.startsWith('nb')) {
        moment.locale('nb');
    } else {
        moment.locale(context.user.userLanguage);
    }

    ReactDom.render((
        <ApolloProvider client={client}>
            <App {...context} />
        </ApolloProvider>
    ), container);
})();
