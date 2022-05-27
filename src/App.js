import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Blogs from './components/Main/Blogs';
import Dashboard from './components/Main/Dashboard';
import Home from './components/Main/Home';
import Login from './components/Main/Login';
import MyPortfolio from './components/Main/MyPortfolio';
import NotFound from './components/Main/NotFound';
import Purchase from './components/Main/Purchase';
import Signup from './components/Main/Signup';
import Footer from './components/Shared/Footer/Footer';
import Header from './components/Shared/Header/Header';
import LoadingSpinner from './components/Shared/Others/LoadingSpinner';
import RequireAuth from './components/Shared/Require/RequireAuth';
import auth from './firebase.init';
import { ToastContainer } from 'react-toastify';
import AddProduct from './components/Dashboard/AddProduct';
import AddReview from './components/Dashboard/AddReview';
import AllUsers from './components/Dashboard/AllUsers';
import ManageOrders from './components/Dashboard/ManageOrders';
import ManageProducts from './components/Dashboard/ManageProducts';
import MyOrders from './components/Dashboard/MyOrders';
import MyProfile from './components/Dashboard/MyProfile';

function App() {
	const [, uLoading] = useAuthState(auth);

	return (
		<div className="App">
			{
				uLoading ?
					<LoadingSpinner height='screen'></LoadingSpinner>
					: <div>
						<Header></Header>

						<main>
							<Routes>
								<Route path='/' element={<Home></Home>}></Route>
								<Route path='/blogs' element={<Blogs></Blogs>}></Route>
								<Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
									<Route path='add-product' element={<AddProduct></AddProduct>}></Route>
									<Route path='add-review' element={<AddReview></AddReview>}></Route>
									<Route path='users' element={<AllUsers></AllUsers>}></Route>
									<Route path='manage-orders' element={<ManageOrders></ManageOrders>}></Route>
									<Route path='manage-products' element={<ManageProducts></ManageProducts>}></Route>
									<Route path='orders' element={<MyOrders></MyOrders>}></Route>
									<Route path='profile' element={<MyProfile></MyProfile>}></Route>
								</Route>
								<Route path='/login' element={<Login></Login>}></Route>
								<Route path='/my-portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
								<Route path='/purchase' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>
								<Route path='/signup' element={<Signup></Signup>}></Route>
								<Route path='*' element={<NotFound></NotFound>}></Route>
							</Routes>
						</main>

						<Footer></Footer>
					</div>
			}

			<ToastContainer />
		</div>
	);
}

export default App;
