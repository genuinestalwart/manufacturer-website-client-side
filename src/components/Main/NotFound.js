import React from "react";
import { Link } from "react-router-dom";
import error404 from "../../assets/error404.png";

const NotFound = () => {
	return (
		<main className='flex justify-center'>
			<div className='text-center md:w-1/2'>
				<div className='my-12 md:my-4'>
					<img className='w-full' src={error404} alt='not found' />
				</div>
				<Link to='/'>
					<button className='btn btn-primary mt-6 mb-12 font-bold px-4 py-2 rounded-md text-accent'>
						Back to Home Page
					</button>
				</Link>
			</div>
		</main>
	);
};

export default NotFound;
