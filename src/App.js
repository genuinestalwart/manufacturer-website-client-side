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

function App() {
	return (
		<div className="App">
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
	);
}

export default App;
