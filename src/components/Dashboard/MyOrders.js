import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MyOrder from '../Mapped/MyOrder';
import CancelModal from '../Shared/Modals/CancelModal';
import BigSpinner from '../Shared/Spinners/BigSpinner';

const MyOrders = () => {
    const { displayName, email } = useAuthState(auth)[0];
    const [orders, setOrders] = useState([]);
    const [cancelOrder, setCancelOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`https://manufacture-online-server.herokuapp.com/orders?username=${displayName}&email=${email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            });
    }, [displayName, email, orders]);

    const handleCancel = () => {
        setShow(false);

        fetch('https://manufacture-online-server.herokuapp.com/cancel-order', {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(cancelOrder)
        })
            .then(() => setOrders(orders.filter(el => el._id !== cancelOrder._id)));
    };

    return (
        <section>
            {
                loading ?
                    <BigSpinner height='h-[calc(100vh_-_5rem)]'></BigSpinner>
                    : orders.length ?
                        <div className='px-8 pb-8'>
                            <div className="overflow-x-auto">
                                <table className="h-full table w-full">
                                    <thead>
                                        <tr className='bg-accent text-primary text-center'>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Type</th>
                                            <th>Price/Item</th>
                                            <th>Amount</th>
                                            <th>Total Price</th>
                                            <th>Deliver to</th>
                                            <th>Phone Number</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order => <MyOrder key={order._id} index={orders.indexOf(order)} order={order} setCancelOrder={setCancelOrder} setShow={setShow}></MyOrder>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : <div className='flex h-[calc(100vh_-_5rem)] items-center justify-center'>
                            <h2 className='font-bold text-accent-focus text-2xl'>No Orders Found!</h2>
                        </div>
            }

            <CancelModal handleCancel={handleCancel} show={show} setShow={setShow}></CancelModal>
        </section>
    );
};

export default MyOrders;