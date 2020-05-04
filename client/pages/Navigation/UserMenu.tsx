import * as React from 'react';
import { AppContext } from '../../AppContext';
import { UserMenuContext } from './UserMenuContext';
import { UserSettings } from './UserSettings';

const MenuDivider = () => <div className='dropdown-divider'></div>;
const MenuItem = ({ text }) => <p className='dropdown-item-text text-muted mb-0' style={{ fontSize: 12 }}>{text}</p>;

export const UserMenu = () => {
    const { user } = React.useContext(AppContext);
    const [showSettings, setShowSettings] = React.useState(false);

    return (
        <UserMenuContext.Provider value={{ showSettings, setShowSettings }}>
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
                        <MenuItem text={user.email} />
                        <MenuDivider />
                        <MenuItem text={`${user.role} (${user.sub}`} />
                        <MenuDivider />
                        <UserSettings className='dropdown-item' />
                        <MenuDivider />
                        <a href='/auth/signout' className='dropdown-item' style={{ fontSize: 12 }}>Sign out of Office 365</a>
                    </div>
                </li>
            </ul>
        </UserMenuContext.Provider>
    );
}