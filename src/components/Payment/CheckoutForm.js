import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data?.clientSecret);
                }
            });
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({ type: 'card', card });
        setCardError(error?.message || '');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <div className='flex items-center justify-between'>
                    <button className='disabled:bg-base-300 disabled:hover:bg-base-300 btn btn-primary btn-sm disabled:cursor-not-allowed font-bold my-4 disabled:pointer-events-auto text-accent disabled:text-accent-focus disabled:hover:text-accent-focus' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
                    <p className={`font-medium grow-0 ${cardError ? '' : 'invisible'} text-accent-focus text-right`}>{cardError}</p>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;