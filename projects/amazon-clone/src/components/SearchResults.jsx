import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import '../SCSS/main.css';
import { useState } from "react";

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }

          const data = await response.json();

          const filteredResults = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
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

    return (
        <>
            <Header />
            <NavBar />
            <div>
                <h1>{`${results.length} results for ${query}`}</h1>
                <div id="search-result-container">
                    {results && results.length > 0 ? (
                        results.map((item, index) => (
                            <div key={index} className="search-result-card">
                                <img src={item.image} alt={item.title}/>
                                <h2>{item.title}</h2>
                                <p>₹{item.price}</p>
                                <p>{item.category}</p>

                                <button>Add to cart</button>
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
