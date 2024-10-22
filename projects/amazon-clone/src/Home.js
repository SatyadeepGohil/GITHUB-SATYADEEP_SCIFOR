import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header";
import NavBar from "./components/navbar";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import './SCSS/main.css';

function Home() {
  return (
    <>
    <Header />
      <Router>
        <NavBar />
      </Router>
      <Carousel />
    <Footer />
    </>
  );
}

export default Home;