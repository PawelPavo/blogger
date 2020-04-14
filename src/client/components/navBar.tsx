import * as React from 'react';
import { Link } from 'react-router-dom'
import { FaFeather } from 'react-icons/fa'



export interface NavbarProps {
}

const Navbar: React.SFC<NavbarProps> = () => {
    return (
        <ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
            <h4 className="text-monospace m-3">Welcome to my Blog</h4>
            <div className="d-flex">
                <Link className="btn btn-primary m-3" to="/new"><FaFeather /> New Blog</Link>
                <Link className="btn btn-outline-primary m-3" to="/"> All Blogs</Link>
                <Link className="btn btn-danger m-3" to="/admin" >Admin</Link>
            </div>
        </ul>

    );
}

export default Navbar;