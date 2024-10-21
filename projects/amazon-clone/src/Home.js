import Header from "./components/header";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { BrowserRouter as Router } from "react-router-dom";
import './SCSS/main.css';

function Home() {
  return (
    <>
    <Header />
      <Router>
        <NavBar />
      </Router>
    <Footer />
    </>
  );
}

export default Home;