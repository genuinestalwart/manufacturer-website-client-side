import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../Payment/CheckoutForm';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';

const stripePromise = loadStripe('pk_test_51L4Iy4JpuNWuxCtplL2nHPQMZ9JOBpLRnYFGnOcMcHKt4fwaBOEpu7otwvPJ00rN4ZTq2vtJVZuee0GLuqwuicOi00F5w34N1z');

const Payment = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const _id = location?.state?._id;
    const order = location?.state?.order;

    useEffect(() => {
        if (_id?.length === 24) {
            fetch(`http://localhost:5000/product/${_id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [_id]);

    const { amount, totalPrice, deliverTo, phoneNumber } = order;
    const { name, price, itemType } = product;

    return (
        <section>
            {
                loading ?
                    <LoadingSpinner height='h-[calc(100vh_-_5rem)]'></LoadingSpinner>
                    : _id ?
                        <div className='flex justify-between mt-4 mb-12 px-20'>
                            <div className='w-1/2'>
                                <div className="card bg-base-100 rounded-lg shadow-xl">
                                    <div className="card-body text-sm">
                                        <h2 className="card-title justify-center my-2 text-2xl">Order Details</h2>
                                        <div>
                                            <table className="table w-full">
                                                <tbody>
                                                    <tr>
                                                        <th>Product Name:</th>
                                                        <td>{name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Product Type:</th>
                                                        <td>{itemType}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Price:</th>
                                                        <td>${price}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Amount of Order:</th>
                                                        <td>{amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Price:</th>
                                                        <td>${totalPrice}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Shipping Address:</th>
                                                        <td>{deliverTo}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contact Number:</th>
                                                        <td>{phoneNumber}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-2/5'>
                                <div className="card bg-base-100 rounded-lg shadow-xl">
                                    <div className="card-body text-sm">
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm />
                                        </Elements>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className='flex h-[calc(100vh_-_5rem)] items-center justify-center'>
                            <h2 className='font-bold text-accent-focus text-2xl'>Please select an item first</h2>
                        </div>
            }
        </section>
    );
};

export default Payment;