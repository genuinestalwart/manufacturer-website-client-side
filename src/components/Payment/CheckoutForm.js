import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import SmallSpinner from '../Shared/Spinners/SmallSpinner';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { _id } = order;
    const [fetchedOrder, setFetchedOrder] = useState({});
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const { totalPrice, username, email, paid, transactionId: tID } = fetchedOrder;

    useEffect(() => {
        fetch('https://manufacture-online-server.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalPrice: totalPrice ? totalPrice : 1 })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data?.clientSecret);
                }
            });
    }, [totalPrice]);

    useEffect(() => {
        fetch(`https://manufacture-online-server.herokuapp.com/order?_id=${_id}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setFetchedOrder(data));
    }, [_id, transactionId]);

    const handlePayment = (id) => {
        fetch('https://manufacture-online-server.herokuapp.com/payment', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ transactionId: id, orderId: _id })
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            setLoading(false);
            return;
        }

        const { error: errorCPM } = await stripe.createPaymentMethod({ type: 'card', card });

        if (errorCPM?.message) {
            setCardError(errorCPM?.message || '');
            setSuccess(false);
            setLoading(false);
        }

        const { paymentIntent, error: errorCCP } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: { card, billing_details: { name: username, email } }
            },
        );

        if (errorCCP) {
            setCardError(errorCCP?.message);
            setLoading(false);

        } else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            handlePayment(paymentIntent.id);
            setSuccess(true);
            setLoading(false);
        }
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

                {
                    loading ?
                        <SmallSpinner></SmallSpinner>
                        : cardError ?
                            <p className={`font-semibold ${cardError ? 'mt-5' : ''} text-accent-focus`}>{cardError}</p>
                            : success || paid ?
                                <p className={`font-semibold ${success || paid ? 'mt-5' : ''}`}><span className='text-success'>Your payment was successful!</span>
                                    <br />
                                    <span className='text-secondary'>Transaction ID: <strong className='text-primary'>{transactionId || tID}</strong></span></p>
                                : ''
                }
                <button className={`disabled:bg-base-300 disabled:hover:bg-base-300 btn btn-primary disabled:cursor-not-allowed font-bold ${cardError || success || paid || loading ? 'mt-4' : 'mt-8'} disabled:pointer-events-auto text-accent disabled:text-accent-focus disabled:hover:text-accent-focus w-full`} type="submit" disabled={paid || !stripe || !clientSecret || success}>{paid || !stripe || !clientSecret || success ? 'Payment done' : 'Pay'}</button>
            </form>
        </div>
    );
};

export default CheckoutForm;