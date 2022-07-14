import {
	faCircleCheck,
	faComments,
	faFlag,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Summary = () => {
	return (
		<section className='px-20'>
			<h2 className='font-bold text-center text-4xl text-primary'>
				Millions of Business Trust Us
			</h2>
			<h4 className='font-bold my-4 text-center text-xl'>
				Trying to be Better
			</h4>

			<div className='grid grid-cols-4 my-12'>
				<div className='text-center'>
					<div className='my-2 text-5xl text-primary'>
						<FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
					</div>
					<h3 className='font-bold my-2 text-4xl text-secondary'>
						63
					</h3>
					<h4 className='font-bold text-2xl text-primary'>
						Countries
					</h4>
				</div>
				<div className='text-center'>
					<div className='my-2 text-5xl text-primary'>
						<FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
					</div>
					<h3 className='font-bold my-2 text-4xl text-secondary'>
						4k+
					</h3>
					<h4 className='font-bold text-2xl text-primary'>Orders</h4>
				</div>
				<div className='text-center'>
					<div className='my-2 text-5xl text-primary'>
						<FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
					</div>
					<h3 className='font-bold my-2 text-4xl text-secondary'>
						200+
					</h3>
					<h4 className='font-bold text-2xl text-primary'>Clients</h4>
				</div>
				<div className='text-center'>
					<div className='my-2 text-5xl text-primary'>
						<FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
					</div>
					<h3 className='font-bold my-2 text-4xl text-secondary'>
						500+
					</h3>
					<h4 className='font-bold text-2xl text-primary'>
						Feedbacks
					</h4>
				</div>
			</div>
		</section>
	);
};

export default Summary;
