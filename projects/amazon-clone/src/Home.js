import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header";
import NavBar from "./components/navbar";
import HeroCarousel from "./components/hero-carousel";
import Products from "./components/products";
import Footer from "./components/footer";
import './SCSS/main.css';

function Home() {
  return (
    <>
    <Router>
      <Header />
        <NavBar />
      <HeroCarousel />
      <Products />
    <Footer />
    </Router>
    </>
  );
}

export default Home;