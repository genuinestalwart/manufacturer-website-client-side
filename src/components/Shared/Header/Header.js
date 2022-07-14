import React from "react";
import Navbar from "./Navbar";
import logo from "../../../assets/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Header = () => {
	const [user] = useAuthState(auth);

	return (
		<header className='flex h-20 items-center justify-between px-16'>
			<div className='flex h-1/2'>
				<div>
					<img className='h-full' src={logo} alt='computer logo' />
				</div>
				<h3 className='flex font-bold items-center mx-2 text-3xl text-primary'>
					Manufacture Online
				</h3>
			</div>

			<h4 className='text-xl text-secondary'>{user?.displayName}</h4>

			<Navbar></Navbar>
		</header>
	);
};

export default Header;
