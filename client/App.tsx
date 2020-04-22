
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { initializeIcons } from '@uifabric/icons';
import i18n from 'i18next';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import { AdminView } from './components/AdminView';
import { Customers } from './components/Customers';
import { Projects } from './components/Projects';
import { Reports } from './components/Reports';
import { Timesheet } from './components/Timesheet';
import { VacationStatus } from './components/VacationStatus';
import GET_CURRENT_USER from './GET_CURRENT_USER';
import { client } from './graphql';

(async () => {
    /**
     * Intializing Azure Application Insights
     */
    if (process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY) {
        const appInsights = new ApplicationInsights({
            config: { instrumentationKey: process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY }
        });
        appInsights.loadAppInsights();
        appInsights.trackPageView();
    }

    initializeIcons();

    /**
     * Initializing i18n with default namespace translation
     */
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
    const __COMPONENTS__ = {
        TIMESHEET: document.getElementById('app-timesheet'),
        PROJECTS: document.getElementById('app-projects'),
        CUSTOMERS: document.getElementById('app-customers'),
        ADMIN: document.getElementById('app-admin'),
        REPORTS: document.getElementById('app-reports'),
        VACATION_STATUS: document.getElementById('app-vacation-status'),
    }

    /**
     * Retrives attribute data-props from the element and parses it as JSON
     * 
     * @param {HTMLElement} element Element (typically a container for a React component)
     */
    const getProps = (element: HTMLElement) => {
        try {
            const props = element.attributes.getNamedItem('data-props').value;
            return JSON.parse(props);
        } catch {
            return {};
        }
    }

    client.query({ query: GET_CURRENT_USER, fetchPolicy: 'cache-first' }).then(({ data }) => {
        if (__COMPONENTS__.TIMESHEET !== null)
            ReactDom.render((
                <ApolloProvider client={client}><Timesheet {...getProps(__COMPONENTS__.TIMESHEET)} /></ApolloProvider>
            ), __COMPONENTS__.TIMESHEET);

        if (__COMPONENTS__.PROJECTS !== null)
            ReactDom.render((
                <ApolloProvider client={client}><Projects /></ApolloProvider>
            ), __COMPONENTS__.PROJECTS);

        if (__COMPONENTS__.CUSTOMERS !== null)
            ReactDom.render((
                <ApolloProvider client={client}><Customers user={data.user} /></ApolloProvider>
            ), __COMPONENTS__.CUSTOMERS);

        if (__COMPONENTS__.REPORTS !== null)
            ReactDom.render((
                <ApolloProvider client={client}><Reports {...getProps(__COMPONENTS__.REPORTS)} /></ApolloProvider>
            ), __COMPONENTS__.REPORTS);

        if (__COMPONENTS__.ADMIN !== null)
            ReactDom.render((
                <ApolloProvider client={client}><AdminView {...getProps(__COMPONENTS__.ADMIN)} /></ApolloProvider>
            ), __COMPONENTS__.ADMIN);

        if (__COMPONENTS__.VACATION_STATUS !== null)
            ReactDom.render((
                <ApolloProvider client={client}><VacationStatus {...getProps(__COMPONENTS__.VACATION_STATUS)} /></ApolloProvider>
            ), __COMPONENTS__.VACATION_STATUS);
    });
})();