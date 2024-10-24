import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import '../SCSS/main.css';
import { useState } from "react";

function SearchResults() {
    const location = new useLocation();
    const searchParams =  new URLSearchParams(location.search)
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fecthData = async () => {
            const options = {
                method: 'GET',
                url: 'https://real-time-amazon-data.p.rapidapi.com/search',
                params: {
                    query: query,
                    page: '1',
                    country: 'US',
                    sort_by: 'RELEVANCE',
                    product_condition: 'ALL',
                    is_prime: 'false',
                    deals_and_discounts: 'NONE'
                },
                headers: {
                    'x-rapidapi-key': 'e3592d4877mshed0912fb419364bp1a6f16jsnc8d3aa1a9635',
                    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setResults(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            };
        };

        if (query) {
            fecthData();
        }
    }, [query]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error}</p>

  return (
    <>
        <Header />
        <NavBar />
        <div>
        <h1>Search Results for: {query}</h1>
        <div>
          {results && results.length > 0 ? (
            results.map((item, index) => (
              <div key={index}>
                <h2>{item.title}</h2>
                <p>{item.price}</p>
                {/* Render other product details as needed */}
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