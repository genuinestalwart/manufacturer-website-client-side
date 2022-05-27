import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';

const Purchase = () => {
    const { displayName, email } = useAuthState(auth)[0];
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const location = useLocation();
    const _id = location?.state?._id;

    useEffect(() => {
        if (_id?.length === 24) {
            fetch(`http://localhost:5000/product/${_id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setAmount(data.minimumQuantity);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [_id]);

    const { name, price, image, itemType, description, minimumQuantity, availableQuantity } = product;

    const handlePurchase = () => {
        const order = {
            username: displayName, productId: _id, email,
            deliverTo: address, phoneNumber, amount,
            totalPrice: amount * Number(price)
        };

        fetch('http://localhost:5000/purchase', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Purchase successful! Please proceed to your Dashboard to see your orders.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            });
    };

    return (
        <section>
            {
                loading ?
                    <LoadingSpinner height='h-[calc(100vh_-_5rem)]'></LoadingSpinner>
                    : _id ?
                        <div className='flex justify-between mt-4 mb-12 px-20'>
                            <div className='w-2/5'>
                                <div className="card bg-base-100 rounded-lg shadow-xl">
                                    <figure><img src={image} alt={itemType} /></figure>

                                    <div className="card-body text-sm">
                                        <h2 className="card-title">{name}</h2>
                                        <p className='whitespace-pre-wrap'>{description}</p>
                                        <p><span className='font-bold'>Price: </span> ${price}</p>
                                        <p><span className='font-bold'>Minimum Order: </span> {minimumQuantity}</p>
                                        <p><span className='font-bold'>Available Items: </span> {availableQuantity}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='w-1/2'>
                                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                                    <div className="card-body">
                                        <div className='flex items-center justify-between'>
                                            <h1 className='font-bold text-4xl'>Place Your Order</h1>
                                            <p className='grow-0'><span className='font-bold'>Total Price:</span> ${isNaN(amount) || amount < Number(minimumQuantity) || amount > Number(availableQuantity) ? 0 : amount * Number(price)}</p>
                                        </div>

                                        <div className="form-control my-2">
                                            <div className="input-group">
                                                <span className="bg-accent font-bold label-text text-primary w-2/5">Username</span>
                                                <input type="text" defaultValue={displayName} className="input input-bordered w-full" disabled />
                                            </div>
                                        </div>

                                        <div className="form-control my-2">
                                            <div className="input-group">
                                                <span className="bg-accent font-bold label-text text-primary w-2/5">Email address</span>
                                                <input type="email" defaultValue={email} className="input input-bordered w-full" disabled />
                                            </div>
                                        </div>

                                        <div className="form-control my-2">
                                            <div className="input-group">
                                                <span className="bg-accent font-bold label-text text-primary w-2/5">Your Address</span>
                                                <input onBlur={(e) => setAddress(e.target.value)} type="text" placeholder='Enter your address' className="input input-bordered focus:outline-primary focus:outline-offset-0 w-full" />
                                            </div>
                                        </div>

                                        <div className="form-control my-2">
                                            <div className="input-group">
                                                <span className="bg-accent font-bold label-text text-primary w-2/5">Phone number</span>
                                                <input onBlur={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder='Enter your number' className="input input-bordered focus:outline-primary focus:outline-offset-0 w-full" />
                                            </div>
                                        </div>

                                        <div className="form-control my-2">
                                            <div className="input-group">
                                                <span className="bg-accent font-bold label-text text-primary w-2/5">Amount of Item</span>
                                                <input onChange={(e) => setAmount(Number(e.target.value))} type="number" placeholder='Enter amount' defaultValue={minimumQuantity} className="input input-bordered focus:outline-primary focus:outline-offset-0 w-full" />
                                            </div>
                                        </div>

                                        <div className="form-control mb-2">
                                            <p className={`text-xs ${isNaN(amount) || amount < Number(minimumQuantity) || amount > Number(availableQuantity) ? 'text-accent-focus' : 'invisible'}`}>Amount cannot be less than {minimumQuantity} and more than {availableQuantity}.</p>
                                        </div>

                                        <div className="form-control">
                                            <button onClick={handlePurchase} className="disabled:bg-base-300 disabled:hover:bg-base-300 btn btn-primary disabled:cursor-not-allowed font-bold disabled:pointer-events-auto text-accent disabled:text-accent-focus disabled:hover:text-accent-focus" disabled={isNaN(amount) || amount < Number(minimumQuantity) || amount > Number(availableQuantity) || !address.trim() || !phoneNumber.trim() ? true : false}>Purchase</button>
                                        </div>
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

export default Purchase;