import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import ProductDetails from "./components/productDetails";
import { CartProvider } from "./components/cartContext";
import Cart from './components/cart';
import { BrowsingHistoryProvider } from "./components/browserHistoryContext";

function App() {
  const [location, setLocation] = useState('Loading...');

      useEffect(() => {
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`)
                .then(response => response.json())
                .then(data => {
                    const address = data.address || {};
                    const city = address.state_district || address.city || address.town || address.village || address.county || address.locatlity || 'City not found';
                    const postalCode = address.postcode || 'Pincode not found';

                    setLocation(`${city} ${postalCode}`)
                }).catch(error => console.error('Error fetching city:', error))
            });
        }
    }

    getLocation();

}, [])

  return (
    <BrowsingHistoryProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home location={location}/>}/>
          <Route path="/search" element={<SearchResults location={location}/>}/>
          <Route path="/product/:id" element={<ProductDetails location={location}/>}/>
          <Route path="/cart" element={<Cart location={location}/>} />
        </Routes>
      </CartProvider>
    </BrowsingHistoryProvider>
  );
}

export default App;
