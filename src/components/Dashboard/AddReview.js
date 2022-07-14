import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Ratings from "../Mapped/Ratings";
import BigSpinner from "../Shared/Spinners/BigSpinner";

const AddReview = () => {
	const [user, loading] = useAuthState(auth);
	const [ratings, setRatings] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: user.displayName,
			email: user.email,
		},
		mode: "onBlur",
	});

	const onSubmit = ({ description, email, username }) => {
		setSubmitting(true);
		const formData = {
			description,
			email,
			ratings,
			username,
		};

		fetch("http://localhost:5000/add-review", {
			method: "PUT",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"content-type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then(() => {
			setSubmitting(false);
			toast.success(
				"Review Posted! Please go to the Home page to see all the reviews.",
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				}
			);
		});
	};

	return (
		<>
			{loading || submitting ? (
				<BigSpinner height='h-[calc(100vh_-_5rem)]'></BigSpinner>
			) : (
				<section>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='hero mb-12'>
						<div className='hero-content p-0 w-2/5'>
							<div className='card w-full shadow-2xl'>
								<div className='card-body'>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>
												Your Name
											</span>
										</label>
										<input
											type='text'
											{...register("username")}
											disabled={true}
											defaultValue={user.displayName}
											className='border-secondary font-semibold input input-bordered focus:outline-primary focus:outline-offset-0 disabled:text-accent'
										/>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>
												Email Address
											</span>
										</label>
										<input
											type='email'
											{...register("email")}
											disabled={true}
											defaultValue={user.email}
											className='border-secondary font-semibold input input-bordered focus:outline-primary focus:outline-offset-0 disabled:text-accent'
										/>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>
												Your Review
											</span>
										</label>
										<textarea
											className='border-secondary textarea textarea-bordered focus:outline-primary focus:outline-offset-0'
											placeholder='Write something here'
											{...register("description", {
												required: true,
											})}
											rows={3}></textarea>
										<p
											className={
												errors.description
													? "mt-2 text-xs text-accent-focus"
													: "hidden"
											}>
											This field is required
										</p>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>
												Your Ratings
											</span>
										</label>
										<div className='text-3xl'>
											{[1, 2, 3, 4, 5].map((el) => (
												<Ratings
													key={el}
													number={el}
													ratings={ratings}
													setRatings={
														setRatings
													}></Ratings>
											))}
										</div>
									</div>

									<div className='form-control mt-6'>
										<button
											type='submit'
											disabled={
												!ratings ||
												errors.description ||
												!watch("description")
											}
											className='disabled:bg-base-200 disabled:hover:bg-base-200 btn btn-primary disabled:cursor-not-allowed font-bold disabled:pointer-events-auto text-accent disabled:text-accent disabled:hover:text-accent'>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</section>
			)}
		</>
	);
};

export default AddReview;
