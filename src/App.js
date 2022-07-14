import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Blogs from "./components/Main/Blogs";
import Dashboard from "./components/Main/Dashboard";
import Home from "./components/Main/Home";
import Login from "./components/Main/Login";
import NotFound from "./components/Main/NotFound";
import Purchase from "./components/Main/Purchase";
import Signup from "./components/Main/Signup";
import Footer from "./components/Shared/Footer/Footer";
import Header from "./components/Shared/Header/Header";
import BigSpinner from "./components/Shared/Spinners/BigSpinner";
import RequireAuth from "./components/Shared/Require/RequireAuth";
import auth from "./firebase.init";
import { ToastContainer } from "react-toastify";
import AddProduct from "./components/Dashboard/AddProduct";
import AddReview from "./components/Dashboard/AddReview";
import AllUsers from "./components/Dashboard/AllUsers";
import ManageOrders from "./components/Dashboard/ManageOrders";
import ManageProducts from "./components/Dashboard/ManageProducts";
import MyOrders from "./components/Dashboard/MyOrders";
import MyProfile from "./components/Dashboard/MyProfile";
import Payment from "./components/Main/Payment";
import RequireAdmin from "./components/Shared/Require/RequireAdmin";
import RequireUser from "./components/Shared/Require/RequireUser";

function App() {
	const [, uLoading] = useAuthState(auth);

	return (
		<div className='App'>
			{uLoading ? (
				<BigSpinner height='h-screen'></BigSpinner>
			) : (
				<div>
					<Header></Header>

					<>
						<Routes>
							<Route path='/' element={<Home></Home>}></Route>
							<Route
								path='/blogs'
								element={<Blogs></Blogs>}></Route>
							<Route
								path='/dashboard'
								element={
									<RequireAuth>
										<Dashboard></Dashboard>
									</RequireAuth>
								}>
								<Route
									path='add-product'
									element={
										<RequireAdmin>
											<AddProduct></AddProduct>
										</RequireAdmin>
									}></Route>
								<Route
									path='add-review'
									element={
										<RequireUser>
											<AddReview></AddReview>
										</RequireUser>
									}></Route>
								<Route
									path='users'
									element={
										<RequireAdmin>
											<AllUsers></AllUsers>
										</RequireAdmin>
									}></Route>
								<Route
									path='manage-orders'
									element={
										<RequireAdmin>
											<ManageOrders></ManageOrders>
										</RequireAdmin>
									}></Route>
								<Route
									path='manage-products'
									element={
										<RequireAdmin>
											<ManageProducts></ManageProducts>
										</RequireAdmin>
									}></Route>
								<Route
									path='orders'
									element={
										<RequireUser>
											<MyOrders></MyOrders>
										</RequireUser>
									}></Route>
								<Route
									path='profile'
									element={
										<RequireAuth>
											<MyProfile></MyProfile>
										</RequireAuth>
									}></Route>
							</Route>
							<Route
								path='/login'
								element={<Login></Login>}></Route>
							<Route
								path='/payment'
								element={
									<RequireUser>
										<Payment></Payment>
									</RequireUser>
								}></Route>
							<Route
								path='/purchase'
								element={
									<RequireUser>
										<Purchase></Purchase>
									</RequireUser>
								}></Route>
							<Route
								path='/signup'
								element={<Signup></Signup>}></Route>
							<Route
								path='*'
								element={<NotFound></NotFound>}></Route>
						</Routes>
					</>

					<Footer></Footer>
				</div>
			)}

			<ToastContainer />
		</div>
	);
}

export default App;
