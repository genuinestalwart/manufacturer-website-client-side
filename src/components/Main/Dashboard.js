import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <section>
            <div className="drawer h-[calc(100vh_-_5rem)]">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                <div className='divide-x-2 divide-accent drawer-content flex'>
                    <div className="flex justify-center w-16">
                        <label htmlFor="dashboard-drawer" className="bg-base-200 hover:bg-base-300 btn border-0 drawer-button h-fit min-h-fit my-2 px-3 py-2 rounded-md text-secondary hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
                    </div>

                    <div className='h-full overflow-y-auto px-4'><Outlet /></div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <ul className="menu p-4 overflow-y-auto w-1/4 bg-base-100 text-base-content">
                        <li><Link to='/dashboard/orders'>My Orders</Link></li>
                        <li><Link to='/dashboard/add-review'>Add a Review</Link></li>
                        <li><Link to='/dashboard/profile'>My Profile</Link></li>
                        <li><Link to='/dashboard/manage-orders'>Manage All Orders</Link></li>
                        <li><Link to='/dashboard/add-product'>Add a Product</Link></li>
                        <li><Link to='/dashboard/users'>All Users</Link></li>
                        <li><Link to='/dashboard/manage-products'>Manage All Products</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;