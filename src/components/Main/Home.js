import React from 'react';
import Banner from '../Home/Banner';
import Products from '../Home/Products';
import Summary from '../Home/Summary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Summary></Summary>
        </div>
    );
};

export default Home;