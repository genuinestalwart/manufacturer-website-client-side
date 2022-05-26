import React, { useEffect, useState } from 'react';
import Product from '../Mapped/Product';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    return (
        <section>
            <h2 className='font-bold text-center text-4xl text-primary'>Products</h2>

            <div className='my-12 px-20'>
                {
                    loading ?
                        <LoadingSpinner height='80'></LoadingSpinner>
                        : <div className='gap-12 grid grid-cols-3'>
                            {
                                products.map(product => <Product key={product._id} product={product}></Product>)
                            }
                        </div>
                }
            </div>


        </section>
    );
};

export default Products;