import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./components/authContext";
import { CartProvider } from "./components/cartContext";
import { BrowsingHistoryProvider } from "./components/browserHistoryContext";
import { AuthProvider } from "./components/authContext";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import ProductDetails from "./components/productDetails";
import Cart from './components/cart';
import Login from './components/login';
import Signup from "./components/signup";

const checkExistingUser = (email) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.some(user => user.email === email);
};

const AuthRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  if (email) {
    const userExists = checkExistingUser(email);
    if (userExists) {
      return <Navigate to={`/login?email=${email}`} replace />;
    } else {
      return <Navigate to={`/signup?email=${email}`} replace />;
    }
  }

  return children;
};

// Protected route for authenticated users
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  const [location, setLocation] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getLocation() {
      try {
        if (!navigator.geolocation) {
          setLocation('Geolocation not supported');
          return;
        }

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: long } = position.coords;
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        const address = data.address || {};
        const city = 
          address.state_district || 
          address.city || 
          address.town || 
          address.village || 
          address.county || 
          address.locality || 
          'City not found';
        const postalCode = address.postcode || 'Pincode not found';

        setLocation(`${city} ${postalCode}`);
      } catch (err) {
        console.error('Location error:', err);
        setError(err.message);
        setLocation('Location unavailable');
      }
    }

    getLocation();
  }, []);

  if (error) {
    console.error('App error:', error);
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home location={location} />} />
      <Route path="/search" element={<SearchResults location={location} />} />
      <Route path="/product/:id" element={<ProductDetails location={location} />} />
      
      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login location={location} />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup location={location} />
          </AuthRoute>
        }
      />
      
      {/* Protected routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart location={location} />
          </ProtectedRoute>
        }
      />
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowsingHistoryProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowsingHistoryProvider>
    </AuthProvider>
  );
}

export default App;