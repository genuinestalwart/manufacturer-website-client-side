import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import auth from './firebase.init';

function App() {
	const [, uLoading] = useAuthState(auth);

	return (
		<div className="App">
			{
				uLoading ?
					<div className='flex h-screen items-center justify-center w-screen'>
						<p className='flex items-center'><LoadingSpinner hw='h-8 w-8'></LoadingSpinner><span className='font-bold ml-2 text-xl text-primary'>Loading...</span></p>
					</div>
					: <div>
						<Header></Header>

						<main>
							<Routes>
								<Route path='/' element={<Home></Home>}></Route>
								<Route path='/blogs' element={<Blogs></Blogs>}></Route>
								<Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
								<Route path='/login' element={<Login></Login>}></Route>
								<Route path='/my-portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
								<Route path='/purchase' element={<Purchase></Purchase>}></Route>
								<Route path='/signup' element={<Signup></Signup>}></Route>
								<Route path='*' element={<NotFound></NotFound>}></Route>
							</Routes>
						</main>

						<Footer></Footer>
					</div>
			}
		</div>
	);
}

export default App;
