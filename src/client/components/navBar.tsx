import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
//@ts-ignore
import MyBlog from '../assets/myblog.png';

export interface NavbarProps {
}

const Navbar: React.SFC<NavbarProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)

    return (
        <>
            <nav className="nav p-2 mb-3 shadow justify-content-between align-items-center bg-info">

                <span className="d-none d-sm-block d-print-block ">
                    <NavLink to="/"><img src={MyBlog} alt="logo" width="75" height="75" /></NavLink>
                    <span className="text-light">  There is no place like code.</span>
                </span>
                <h4 className="text-white display">{navbarText}</h4>

                <div className="d-flex justify-content-center align-items-center">
                    <NavLink className="mx-2 text-decoration-none text-white" activeClassName="text-secondary border-bottom border-secondary" exact to="/">Home</NavLink>
                    <NavLink className="mx-2 text-decoration-none text-white" activeClassName="text-secondary border-bottom border-secondary" exact to="/new">New Blog</NavLink>
                    <NavLink className="mx-2 text-decoration-none text-white" activeClassName="text-secondary border-bottom border-secondary" exact to="/admin">Admin</NavLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar;