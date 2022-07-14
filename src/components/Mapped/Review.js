import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import user from "../../assets/user.png";

const Review = ({ review }) => {
	const { description, username, ratings } = review;

	return (
		<div className='card shadow-xl'>
			<div className='card-body gap-4 p-6'>
				<div className='flex'>
					<div className='w-1/4'>
						<img className='w-full' src={user} alt='' />
					</div>
					<h5 className='card-title ml-4 text-secondary w-3/4'>
						{username}
					</h5>
				</div>

				<p className=''>{description}</p>

				<div>
					<FontAwesomeIcon
						className='text-primary'
						icon={faSolidStar}></FontAwesomeIcon>
					{ratings > 1 ? (
						<FontAwesomeIcon
							className='text-primary'
							icon={faSolidStar}></FontAwesomeIcon>
					) : (
						<FontAwesomeIcon
							className='text-secondary'
							icon={faRegularStar}></FontAwesomeIcon>
					)}
					{ratings > 2 ? (
						<FontAwesomeIcon
							className='text-primary'
							icon={faSolidStar}></FontAwesomeIcon>
					) : (
						<FontAwesomeIcon
							className='text-secondary'
							icon={faRegularStar}></FontAwesomeIcon>
					)}
					{ratings > 3 ? (
						<FontAwesomeIcon
							className='text-primary'
							icon={faSolidStar}></FontAwesomeIcon>
					) : (
						<FontAwesomeIcon
							className='text-secondary'
							icon={faRegularStar}></FontAwesomeIcon>
					)}
					{ratings > 4 ? (
						<FontAwesomeIcon
							className='text-primary'
							icon={faSolidStar}></FontAwesomeIcon>
					) : (
						<FontAwesomeIcon
							className='text-secondary'
							icon={faRegularStar}></FontAwesomeIcon>
					)}
				</div>
			</div>
		</div>
	);
};

export default Review;
