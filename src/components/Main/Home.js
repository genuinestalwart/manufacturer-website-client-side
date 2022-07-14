import React from "react";
import Banner from "../Home/Banner";
import Products from "../Home/Products";
import Reviews from "../Home/Reviews";
import Summary from "../Home/Summary";

const Home = () => {
	return (
		<main>
			<Banner></Banner>
			<Products></Products>
			<Summary></Summary>
			<Reviews></Reviews>
		</main>
	);
};

export default Home;
