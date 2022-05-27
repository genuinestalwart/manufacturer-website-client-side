import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MyOrder from '../Mapped/MyOrder';
import ErrorModal from '../Shared/Modals/ErrorModal';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';

const MyOrders = () => {
    const { displayName, email } = useAuthState(auth)[0];
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?username=${displayName}&email=${email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            });
    }, [displayName, email]);

    return (
        <section>
            {
                loading ?
                    <LoadingSpinner height='h-[calc(100vh_-_5rem)]'></LoadingSpinner>
                    : <div className='px-8 pb-8'>
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
                                        orders.map(order => <MyOrder key={orders.indexOf(order)} index={orders.indexOf(order)} order={order} setShow={setShow}></MyOrder>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }

            <ErrorModal show={show} setShow={setShow}></ErrorModal>
        </section>
    );
};

export default MyOrders;