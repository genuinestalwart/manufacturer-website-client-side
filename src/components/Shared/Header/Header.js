import React from 'react';
import Navbar from './Navbar';
import logo from '../../../assets/logo.png';

const Header = () => {
    return (
        <header className='flex h-20 items-center justify-between px-16'>
            <div className='flex h-1/2'>
                <div><img className='h-full' src={logo} alt="computer logo" /></div>
                <h2 className='flex font-bold items-center mx-2 text-3xl text-primary'>Manufacture Online</h2>
            </div>

            <Navbar></Navbar>
        </header>
    );
};

export default Header;