import Header from './header';
import NavBar from './navbar';
import HeroCarousel from './hero-carousel';
import Products from './products';
import HistoryCarousel from './historyCarousel';
import Footer from './footer';
import '../SCSS/main.css';

function Home({ location }) {
  return (
   <>
    <Header location={location}/>
    <NavBar />
    <HeroCarousel />
    <Products />
    <HistoryCarousel />
    <Footer />
   </>
  );
}

export default Home;