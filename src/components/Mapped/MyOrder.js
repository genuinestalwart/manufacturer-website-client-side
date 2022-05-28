import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MyOrder = ({ index, order, setCancelOrder, setShow }) => {
    const { productId, amount, paid, totalPrice, deliverTo, phoneNumber, transactionId } = order;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch(`https://manufacture-online-server.herokuapp.com/product/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [productId]);

    const { name, price, itemType } = product;

    const handleCancel = () => {
        setCancelOrder(order);
        setShow(true);
    };

    if (loading) {
        return (
            <tr className='hover:bg-neutral'>
                <td>0</td>
                <td>-</td>
                <td>-</td>
                <td>0</td>
                <td>0</td>
                <td>$0</td>
                <td>-</td>
                <td>-</td>
                <td className='space-x-4 text-center'>
                    <button className="btn btn-sm btn-primary text-accent">Pay</button>
                    <button className="hover:bg-error hover:border-error btn btn-sm btn-accent text-primary">Cancel</button>
                </td>
            </tr>
        );
    }

    return (
        <tr className='hover:bg-neutral'>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{itemType}</td>
            <td>{price}</td>
            <td>{amount}</td>
            <td>${totalPrice}</td>
            <td>{deliverTo}</td>
            <td>{phoneNumber}</td>
            {
                paid ?
                    <td className='space-x-4 text-center'>
                        <span className="badge badge-secondary font-bold h-auto py-1 rounded-2xl text-neutral">Paid</span>
                        <span>Transaction ID: <span className='font-semibold text-primary'>{transactionId}</span></span>
                    </td>
                    : <td className='space-x-8 text-center'>
                        <Link className="btn btn-sm btn-primary text-accent" to='/payment' state={{ from: location, _id: productId, order }}>Pay</Link>
                        <button onClick={handleCancel} className="hover:bg-error hover:border-error btn btn-sm btn-accent text-primary">Cancel</button>
                    </td>
            }
        </tr>
    );
};

export default MyOrder;