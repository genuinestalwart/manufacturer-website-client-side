import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const applyClass = ({ isActive }) => {
        return `font-bold px-3 py-2 ${isActive ? 'bg-accent text-primary' : 'hover:bg-secondary bg-transparent'}`;
    };

    return (
        <div className="navbar w-auto">
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 space-x-1">
                    <li><NavLink className={applyClass} to='/'>Home</NavLink></li>
                    <li><NavLink className={applyClass} to='/purchase'>Purchase</NavLink></li>
                    <li><NavLink className={applyClass} to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink className={applyClass} to='/blogs'>Blogs</NavLink></li>
                    <li><NavLink className={applyClass} to='/my-portfolio'>My Portfolio</NavLink></li>
                    <li><NavLink className={applyClass} to='/login'>Log in</NavLink></li>
                    <li><NavLink className={applyClass} to='/signup'>Signup</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;