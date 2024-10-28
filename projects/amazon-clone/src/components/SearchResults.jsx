import { BrowserRouter as Router, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import { useCart } from "./cartContext";
import '../SCSS/main.css';
import { useState } from "react";

function renderStars(rating, reviews) {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const reviewsCount = reviews.length || 0;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full star with gold color and proper spacing
      stars.push(
        <span 
          key={i}
          style={{
            color: '#FFD700',
            fontSize: '1.2rem',
            marginRight: '2px'
          }}
          role="img" 
          aria-label="full star"
        >
          ★
        </span>
      );
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half star
      stars.push(
        <span 
          key={i}
          style={{
            color: '#FFD700',
            fontSize: '1.2rem',
            marginRight: '2px',
            position: 'relative'
          }}
          role="img"
          aria-label="half star"
        >
          <span style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>★</span>
          <span style={{ color: '#D3D3D3' }}>☆</span>
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span 
          key={i}
          style={{
            color: '#D3D3D3',
            fontSize: '1.2rem',
            marginRight: '2px'
          }}
          role="img"
          aria-label="empty star"
        >
          ☆
        </span>
      );
    }
  }

  return (
    <div title={`Rating: ${rating} out of 5`} style={{ display: 'inline-flex', alignItems: 'center' }}>
       <span style={{ marginLeft: '4px', fontSize: '0.9rem', color: '#666' }}>
        ({rating})
      </span>
      {stars}
      <span>
        {reviewsCount} ratings
      </span>
    </div>
  );
}

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cartItems, addToCart, removeFromCart, getItemCountById } = useCart();

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await fetch('https://dummyjson.com/products');
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }

          const data = await response.json();

          const filteredResults = data.products.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
          setResults(filteredResults)
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [query]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const isInCart = (itemId) => cartItems.some(item => item.id === itemId);

    return (
        <>
            <Header />
            <NavBar />
            <div>
                <h1>{`${results.length} results for ${query}`}</h1>
                <div id="search-result-container">
                    {results && results.length > 0 ? (
                      results.map((item, index) => (
                          <div className="search-result-card">

                                <Link key={item.id} to={`/product/${item.id}`}>
                                <img src={item.thumbnail} alt={item.title}/>
                                </Link>

                                <div>

                                  <Link key={item.id} to={`/product/${item.id}`}>
                                  <h4>{item.title}</h4>
                                  </Link>

                                  {renderStars(item.rating, item.reviews)}

                                  <div className="pricing-info">
                                    <p className="discounted-price">
                                      ₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                                    </p>
                                    <p className="original-price">
                                      M.R.P
                                      <span style={{ textDecoration: 'line-through', marginLeft: '8px'}}>
                                        ₹{item.price}
                                      </span>
                                    </p>
                                    <p>
                                      ({item.discountPercentage}% off)
                                    </p>
                                  </div>
                                  <p>{item.shippingInformation}</p>
                                  <button onClick={() => addToCart(item)}>Add to cart</button>
                                  {isInCart(item.id) ? (
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                  ) : null}
                                  <p>{getItemCountById(item.id)}</p>
                                </div>
                          </div>
                      ))
                  ) : (
                      <p>No results found</p>
                  )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SearchResults;
