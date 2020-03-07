
import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import { Customers } from './components/Customers';
import { Timesheet } from './components/Timesheet';
import { Projects } from './components/Projects';
import { AdminView } from './components/AdminView';
import { Reports } from './components/Reports';
import { client } from './graphql';
import GET_CURRENT_USER from './GET_CURRENT_USER';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

if (process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY) {
    const appInsights = new ApplicationInsights({
        config: { instrumentationKey: process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY }
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
}

initializeIcons();

/**
 * Registry of components
 */
const COMPONENTS = {
    TIMESHEET: document.getElementById('app-timesheet'),
    PROJECTS: document.getElementById('app-projects'),
    CUSTOMERS: document.getElementById('app-customers'),
    ADMIN: document.getElementById('app-admin'),
    REPORTS: document.getElementById('app-reports'),
}

const getProps = (element: HTMLElement) => {
    let props = element.attributes.getNamedItem('data-props').value;
    try {
        return JSON.parse(props);
    } catch {
        return {};
    }
}

client.query({ query: GET_CURRENT_USER, fetchPolicy: 'cache-first' }).then(({ data }) => {
    if (COMPONENTS.TIMESHEET !== null)
        ReactDom.render((
            <ApolloProvider client={client}><Timesheet {...getProps(COMPONENTS.TIMESHEET)} /></ApolloProvider>
        ), COMPONENTS.TIMESHEET);

    if (COMPONENTS.PROJECTS !== null)
        ReactDom.render((
            <ApolloProvider client={client}><Projects /></ApolloProvider>
        ), COMPONENTS.PROJECTS);

    if (COMPONENTS.CUSTOMERS !== null)
        ReactDom.render((
            <ApolloProvider client={client}><Customers user={data.user} /></ApolloProvider>
        ), COMPONENTS.CUSTOMERS);

    if (COMPONENTS.REPORTS !== null)
        ReactDom.render((
            <ApolloProvider client={client}><Reports {...getProps(COMPONENTS.REPORTS)} /></ApolloProvider>
        ), COMPONENTS.REPORTS);

    if (COMPONENTS.ADMIN !== null)
        ReactDom.render((
            <ApolloProvider client={client}><AdminView {...getProps(COMPONENTS.ADMIN)} /></ApolloProvider>
        ), COMPONENTS.ADMIN);
});