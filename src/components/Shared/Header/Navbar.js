import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../../../firebase.init";
import useFirebase from "../../../hooks/useFirebase";

const Navbar = () => {
	const [user] = useAuthState(auth);
	const { logOut } = useFirebase();

	const applyClass = ({ isActive }) => {
		return `font-bold px-3 ${
			isActive
				? "bg-accent text-primary"
				: "hover:bg-secondary bg-transparent hover:text-neutral"
		}`;
	};

	return (
		<div className='navbar w-auto'>
			<div className='flex-none'>
				{user ? (
					<ul className='menu menu-horizontal p-0 space-x-1'>
						<li>
							<NavLink className={applyClass} to='/'>
								Home
							</NavLink>
						</li>

						<li className='font-bold'>
							<span className='bg-transparent gap-0'>
								Menu{" "}
								<svg
									className='fill-current'
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'>
									<path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
								</svg>
							</span>

							<ul className='bg-base-100 absolute z-10'>
								<li className='my-0.5'>
									<NavLink
										className={applyClass}
										to='/dashboard/profile'>
										Dashboard
									</NavLink>
								</li>
								<li className='my-0.5'>
									<NavLink className={applyClass} to='/blogs'>
										Blogs
									</NavLink>
								</li>
								<li className='my-0.5'>
									<NavLink
										className={applyClass}
										to='/my-portfolio'>
										My Portfolio
									</NavLink>
								</li>
							</ul>
						</li>

						<li>
							<button
								onClick={logOut}
								className='hover:bg-secondary bg-transparent font-bold px-3 py-2 hover:text-neutral'>
								Log out
							</button>
						</li>
					</ul>
				) : (
					<ul className='menu menu-horizontal p-0 space-x-1'>
						<li>
							<NavLink className={applyClass} to='/'>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink className={applyClass} to='/blogs'>
								Blogs
							</NavLink>
						</li>
						<li>
							<NavLink className={applyClass} to='/my-portfolio'>
								My Portfolio
							</NavLink>
						</li>
						<li>
							<NavLink className={applyClass} to='/login'>
								Log in
							</NavLink>
						</li>
						<li>
							<NavLink className={applyClass} to='/signup'>
								Signup
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Navbar;
