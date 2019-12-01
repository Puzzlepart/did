
import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDom from 'react-dom';
import { Customers } from './components/Customers';
import { EventView } from './components/EventView';
import { Projects } from './components/Projects';
import { AdminView } from './components/AdminView';
import { AdminUserView } from './components/AdminUserView';
import { client } from './graphql';

initializeIcons();

/**
 * Registry of components
 */
const COMPONENTS = {
    WEEK: document.getElementById('app-week'),
    PROJECTS: document.getElementById('app-projects'),
    CUSTOMERS: document.getElementById('app-customers'),
    ADMIN: document.getElementById('app-admin'),
    ADMIN_USER: document.getElementById('app-admin-user'),
}

const getProps = (element: HTMLElement) => {
    let props = element.attributes.getNamedItem('data-props').value;
    try {
        return JSON.parse(props);
    } catch {
        return {};
    }
}

if (COMPONENTS.WEEK !== null) ReactDom.render(<ApolloProvider client={client}><EventView visibleWeeks={10} /></ApolloProvider>, COMPONENTS.WEEK);
if (COMPONENTS.PROJECTS !== null) ReactDom.render(<ApolloProvider client={client}><Projects /></ApolloProvider>, COMPONENTS.PROJECTS);
if (COMPONENTS.CUSTOMERS !== null) ReactDom.render(<ApolloProvider client={client}><Customers /></ApolloProvider>, COMPONENTS.CUSTOMERS);
if (COMPONENTS.ADMIN !== null) ReactDom.render(<ApolloProvider client={client}><AdminView /></ApolloProvider>, COMPONENTS.ADMIN);
if (COMPONENTS.ADMIN_USER !== null) ReactDom.render(<ApolloProvider client={client}><AdminUserView {...getProps(COMPONENTS.ADMIN_USER)} /></ApolloProvider>, COMPONENTS.ADMIN_USER);