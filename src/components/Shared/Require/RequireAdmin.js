import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import useFirebase from "../../../hooks/useFirebase";
import BigSpinner from "../Spinners/BigSpinner";

const RequireAdmin = ({ children }) => {
	const location = useLocation();
	const { logOut } = useFirebase();
	const [user, loading] = useAuthState(auth);
	const [userInfo, setUserInfo] = useState({});
	const [vLoading, setVLoading] = useState(true);
	const [aLoading, setALoading] = useState(true);
	const [validUser, setValidUser] = useState(true);

	useEffect(() => {
		if (user) {
			fetch(
				`https://manufacture-online-server.herokuapp.com/verify?email=${user.email}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
						"content-type": "application/json",
					},
				}
			).then((res) => {
				if (res.status !== 200) {
					setValidUser(false);
					logOut();
				}
				setVLoading(false);
			});

			fetch(
				`https://manufacture-online-server.herokuapp.com/verify-admin?email=${user.email}&username=${user.displayName}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
						"content-type": "application/json",
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					setUserInfo(data);
					setALoading(false);
				});
		} else {
			setVLoading(false);
		}
	}, [user, logOut]);

	if (loading || vLoading || aLoading) {
		return <BigSpinner height='h-[calc(100vh_-_5rem)]'></BigSpinner>;
	}

	if (!user || !validUser) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (!userInfo.admin) {
		logOut();
		return <Navigate to='/' state={{ from: location }} replace />;
	}

	return children;
};

export default RequireAdmin;
