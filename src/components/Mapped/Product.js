import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, name, price, image, itemType, description, minimumQuantity, availableQuantity } = product;
    const location = useLocation();

    return (
        <div>
            <div className="card bg-base-100 hover:outline outline-4 outline-offset-0 outline-secondary rounded-lg shadow-xl">
                <figure><img src={image} alt={itemType} /></figure>
                <div className="card-body text-sm">
                    <h2 className="card-title">{name}</h2>
                    <p className='whitespace-pre-wrap'>{description}</p>
                    <p><span className='font-bold'>Price:</span> ${price}</p>
                    <p><span className='font-bold'>Minimum Order:</span> {minimumQuantity}</p>
                    <p><span className='font-bold'>Available Items:</span> {availableQuantity}</p>
                    <div className="card-actions">
                        <Link className="btn btn-primary font-bold text-accent w-full" _id={_id} to='/purchase' state={{ from: location }}>Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;