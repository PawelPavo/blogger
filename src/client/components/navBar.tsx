import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { getPathText } from '../utils/pathing';

export interface NavbarProps {
}

const Navbar: React.SFC<NavbarProps> = () => {

    const { pathname } = useLocation()

    const navbarText = getPathText(pathname)

    return (
        <>
            <nav className="nav p-2 mb-3 shadow justify-content-between align-items-center">
                <span className="navbar-brand">{navbarText}</span>
                <div className="d-flex justify-content-center align-items-center">
                    <NavLink className="mx-2 text-decoration-none" activeClassName="text-warning border-bottom border-warning" exact to="/">Home</NavLink>
                    <NavLink className="mx-2 text-decoration-none" activeClassName="text-warning border-bottom border-warning" exact to="/new">New Blog</NavLink>
                    <NavLink className="mx-2 text-decoration-none" activeClassName="text-warning border-bottom border-warning" exact to="/admin">Admin</NavLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar;