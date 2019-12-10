
import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import { Customers } from './components/Customers';
import { EventView } from './components/EventView';
import { Projects } from './components/Projects';
import { AdminView } from './components/AdminView';
import { AdminUserView } from './components/AdminUserView';
import { FAQ } from './components/FAQ';
import { client } from './graphql';

initializeIcons();

/**
 * Registry of components
 */
const COMPONENTS = {
    EVENT_VIEW: document.getElementById('app-eventview'),
    PROJECTS: document.getElementById('app-projects'),
    CUSTOMERS: document.getElementById('app-customers'),
    ADMIN: document.getElementById('app-admin'),
    ADMIN_USER: document.getElementById('app-admin-user'),
    FAQ: document.getElementById('app-faq'),
}

const getProps = (element: HTMLElement) => {
    let props = element.attributes.getNamedItem('data-props').value;
    try {
        return JSON.parse(props);
    } catch {
        return {};
    }
}

if (COMPONENTS.EVENT_VIEW !== null) ReactDom.render(<ApolloProvider client={client}><EventView {...getProps(COMPONENTS.EVENT_VIEW)} /></ApolloProvider>, COMPONENTS.EVENT_VIEW);
if (COMPONENTS.PROJECTS !== null) ReactDom.render(<ApolloProvider client={client}><Projects /></ApolloProvider>, COMPONENTS.PROJECTS);
if (COMPONENTS.CUSTOMERS !== null) ReactDom.render(<ApolloProvider client={client}><Customers /></ApolloProvider>, COMPONENTS.CUSTOMERS);
if (COMPONENTS.ADMIN !== null) ReactDom.render(<ApolloProvider client={client}><AdminView {...getProps(COMPONENTS.ADMIN)} /></ApolloProvider>, COMPONENTS.ADMIN);
if (COMPONENTS.ADMIN_USER !== null) ReactDom.render(<ApolloProvider client={client}><AdminUserView {...getProps(COMPONENTS.ADMIN_USER)} /></ApolloProvider>, COMPONENTS.ADMIN_USER);
if (COMPONENTS.FAQ !== null) ReactDom.render(<ApolloProvider client={client}><FAQ {...getProps(COMPONENTS.FAQ)} /></ApolloProvider>, COMPONENTS.FAQ);