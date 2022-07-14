import React, { useEffect, useState } from "react";
import Review from "../Mapped/Review";
import BigSpinner from "../Shared/Spinners/BigSpinner";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:5000/reviews")
			.then((res) => res.json())
			.then((data) => {
				setReviews(data);
				setLoading(false);
			});
	}, []);

	return (
		<section>
			<h2 className='font-bold text-center text-4xl text-primary'>
				Reviews
			</h2>

			<div className='my-12 px-20'>
				{loading ? (
					<BigSpinner height='h-80'></BigSpinner>
				) : (
					<div className='gap-12 grid grid-cols-3'>
						{reviews.map((review) => (
							<Review key={review._id} review={review}></Review>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Reviews;
