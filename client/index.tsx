import { initializeIcons } from '@uifabric/icons';
import { AdminView, Customers, Projects, Reports, Timesheet, UserNotifications } from 'components';
import 'core-js/stable';
import i18n from 'i18next';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import 'regenerator-runtime/runtime.js';
import { tryParseJson } from 'utils/tryParseJson';
import GET_CURRENT_USER from './GET_CURRENT_USER';
import * as graphql from './graphql';

(async () => {
    initializeIcons();

    // Initializing i18n with default namespace translation
    await i18n.init({
        lng: 'en',
        debug: false,
        resources: {
            en: { translation: require('./i18n/en.json') },
            no: { translation: require('./i18n/en.json') },
        }
    });

    /**
     * Registry of components
     */
    const COMPONENTS = {
        TIMESHEET: document.getElementById('app-timesheet'),
        PROJECTS: document.getElementById('app-projects'),
        CUSTOMERS: document.getElementById('app-customers'),
        ADMIN: document.getElementById('app-admin'),
        REPORTS: document.getElementById('app-reports'),
        USERNOTIFICATIONS: document.getElementById('app-user-notifications'),
    }

    /**
     * Get React element props from specified HTMLElement
     * 
     * @param {HTMLElement} element Element
     */
    const getProps = (element: HTMLElement) => {
        let props = element.attributes.getNamedItem('data-props').value;
        return tryParseJson(props);
    }

    const client = graphql.getClient()

    /**
     * Renders the component in the specified HTMLElement wrapped in ApolloProvider
     * 
     * @param {any} component Component
     * @param {HTMLElement} container Container element
     */
    const renderComponent = (component: any, container: HTMLElement) => {
        let element = React.createElement(ApolloProvider, {
            client,
            children: React.createElement(component, getProps(container)),
        })
        ReactDom.render(element, container);
    }


    client.query({ query: GET_CURRENT_USER, fetchPolicy: 'cache-first' }).then(({ data }) => {
        if (COMPONENTS.TIMESHEET !== null)
            renderComponent(Timesheet, COMPONENTS.TIMESHEET);
        if (COMPONENTS.PROJECTS !== null)
            renderComponent(Projects, COMPONENTS.PROJECTS);
        if (COMPONENTS.CUSTOMERS !== null)
            renderComponent(Customers, COMPONENTS.CUSTOMERS);
        if (COMPONENTS.REPORTS !== null)
            renderComponent(Reports, COMPONENTS.REPORTS);
        if (COMPONENTS.ADMIN !== null)
            renderComponent(AdminView, COMPONENTS.ADMIN);
        if (COMPONENTS.USERNOTIFICATIONS !== null)
            renderComponent(UserNotifications, COMPONENTS.USERNOTIFICATIONS);
    });
})();