import { AppContext } from 'AppContext';
import resource from 'i18n';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserMenu } from './UserMenu';

export const Navigation = () => {
    const { user } = React.useContext(AppContext);
    return (
        <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
            <div className='container'>
                <Link to='/' className='navbar-brand'><img src='/images/did365navlogobeta.png' height='37' /></Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse'
                    aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/timesheet' className='nav-link' activeClassName='active'>{resource('NAVIGATION.TIMESHEET')}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/customers' className='nav-link' activeClassName='active'>{resource('NAVIGATION.CUSTOMERS')}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/projects' className='nav-link' activeClassName='active'>{resource('NAVIGATION.PROJECTS')}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/reports' className='nav-link' activeClassName='active'>{resource('NAVIGATION.REPORTS')}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/admin' className='nav-link' activeClassName='active'>{resource('NAVIGATION.ADMIN')}</NavLink>
                        </li>
                    </ul>
                    <UserMenu />
                </div>
            </div>
        </nav>
    );
}