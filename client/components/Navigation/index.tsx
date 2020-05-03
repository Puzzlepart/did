import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { Home, Timesheet, Customers, Projects, Reports, Admin } from 'components';

export const Navigation = () => {
    const { user, info } = React.useContext(AppContext);
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
                        <li className='nav-item'>
                            <NavLink exact to='/' className='nav-link' activeClassName='active'>{Home['displayName']}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/timesheet' className='nav-link' activeClassName='active'>{Timesheet['displayName']}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/customers' className='nav-link' activeClassName='active'>{Customers['displayName']}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/projects' className='nav-link' activeClassName='active'>{Projects['displayName']}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/reports' className='nav-link' activeClassName='active'>{Reports['displayName']}</NavLink>
                        </li>
                        <li className='nav-item' hidden={!user}>
                            <NavLink to='/admin' className='nav-link' activeClassName='active'>{Admin['displayName']}</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav justify-content-end'>
                        <li className='nav-item dropdown'>
                            <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button'
                                aria-haspopup='true' aria-expanded='false'>
                                <i className='far fa-user-circle fa-lg rounded-circle align-self-center mr-2' style={{ width: 32 }}></i>
                            </a>
                            <div className='dropdown-menu dropdown-menu-right'>
                                <h5 className='dropdown-item-text mb-0'>
                                    {user.fullName}
                                </h5>
                                <p className='dropdown-item-text text-muted mb-0' style={{ fontSize: 12 }}>
                                    {user.email}
                                </p>
                                <div className='dropdown-divider'></div>
                                <p className='dropdown-item-text text-muted mb-0' style={{ fontSize: 12 }}>{user.role} ({user.sub})</p>
                                <div className='dropdown-divider'></div>
                                <a href='/auth/signout' className='dropdown-item' style={{ fontSize: 12 }}>Sign out of Office 365</a>
                                {info && (
                                    <div>
                                        <div className='dropdown-divider'></div>
                                        {info.branch
                                            ? <a href={`https://github.com/Puzzlepart/did365/pull/${info.branch}`} className='dropdown-item' style={{ fontSize: 12 }}>#{info.branch}</a>
                                            : <span className='dropdown-item' style={{ fontSize: 9 }}>v{info.version}</span>
                                        }
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}