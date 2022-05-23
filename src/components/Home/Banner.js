import React from 'react';
import bannar from '../../assets/banner.jpg';

const Banner = () => {
    return (
        <section className='px-20'>
            <div className="hero h-[calc(100vh_-_5rem)]">
                <div className="hero-content flex md:flex-row-reverse">
                    <img src={bannar} className="w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div className='w-1/2'>
                        <h1 className="font-bold text-5xl text-secondary">Buy One, Win One!</h1>
                        <p className="py-6">Following our old legacy, we have launched our best selling offer once again after the pandemic. So what are you waiting for? Let's dive in!</p>
                        <button className="btn btn-primary font-bold text-accent">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;