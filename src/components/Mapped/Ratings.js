import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Ratings = ({ number, ratings, setRatings }) => {
	const handleRatings = () => {
		setRatings(number);
	};

	return (
		<>
			{ratings && number <= ratings ? (
				<FontAwesomeIcon
					onClick={handleRatings}
					className='text-primary'
					icon={faSolidStar}></FontAwesomeIcon>
			) : (
				<FontAwesomeIcon
					onClick={handleRatings}
					className='text-secondary'
					icon={faRegularStar}></FontAwesomeIcon>
			)}
		</>
	);
};

export default Ratings;
