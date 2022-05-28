import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [close, setClose] = useState(true);
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [admin, setAdmin] = useState(true);
    const [aLoading, setALoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/verify-admin?email=${user.email}&username=${user.displayName}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.admin);
                    setALoading(false);
                });
        }
    }, [user]);

    const applyClass = ({ isActive }) => {
        return `font-bold mt-2 ${isActive ? 'bg-accent text-primary' : 'hover:bg-secondary bg-transparent hover:text-neutral'}`;
    };

    if (loading || aLoading) {
        return <div></div>;
    }

    if (location.pathname === '/dashboard') {
        return <Navigate to='/dashboard/profile' state={{ from: location }} replace></Navigate>;
    }

    return (
        <section>
            <div className="drawer h-[calc(100vh_-_5rem)]">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={!close ? true : false} readOnly />

                <div className='divide-x-2 divide-primary drawer-content flex'>
                    <div className="flex justify-center w-16">
                        <label onClick={() => setClose(false)} htmlFor="dashboard-drawer" className="bg-base-200 hover:bg-base-300 btn border-0 drawer-button h-fit min-h-fit my-2 px-3 py-2 rounded-md text-secondary hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
                    </div>

                    <div className='h-full overflow-y-auto w-full'><Outlet /></div>
                </div>

                <div className="drawer-side">
                    <label onClick={() => setClose(true)} htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <ul className="menu p-4 overflow-y-auto w-1/4 bg-base-100 text-base-content">
                        <li className={admin ? 'hidden' : ''}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/orders'>My Orders</NavLink></li>
                        <li className={admin ? 'hidden' : ''}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/add-review'>Add a Review</NavLink></li>
                        <li><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/profile'>My Profile</NavLink></li>
                        <li className={admin ? '' : 'hidden'}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/manage-orders'>Manage All Orders</NavLink></li>
                        <li className={admin ? '' : 'hidden'}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/add-product'>Add a Product</NavLink></li>
                        <li className={admin ? '' : 'hidden'}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/users'>All Users</NavLink></li>
                        <li className={admin ? '' : 'hidden'}><NavLink className={applyClass} onClick={() => setClose(true)} to='/dashboard/manage-products'>Manage All Products</NavLink></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;