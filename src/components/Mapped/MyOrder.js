import React, { useEffect, useState } from 'react';

const MyOrder = ({ index, order, setShow }) => {
    const { productId, amount, totalPrice, deliverTo, phoneNumber } = order;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/product/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [productId]);

    const { name, price, itemType } = product;

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
            <td className='space-x-4'>
                <button className="btn btn-sm btn-primary text-accent">Pay</button>
                <button onClick={() => setShow(true)} className="hover:bg-error hover:border-error btn btn-sm btn-accent text-primary">Cancel</button>
            </td>
        </tr>
    );
};

export default MyOrder;