import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectWidth, setSelectWidth] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const selectRef = useRef(null);

    const categories = [
    { value: 'all', label: 'All' },
    { value: 'alexa-skills', label: 'Alexa Skills' },
    { value: 'amazon-devices', label: 'Amazon Devices' },
    { value: 'amazon-fashion', label: 'Amazon Fashion' },
    { value: 'amazon-pharmacy', label: 'Amazon Pharmacy' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'apps-games', label: 'Apps & Games' },
    { value: 'audible-audiobooks', label: 'Audible Audiobooks' },
    { value: 'baby', label: 'Baby' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'books', label: 'Books' },
    { value: 'cars-motorbikes', label: 'Cars & Motorbikes' },
    { value: 'clothing-accessories', label: 'Clothing Accessories' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'computer', label: 'Computers & Accessories' },
    { value: 'Deal', label: 'deal' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'garden-outdoors', label: 'Garden & Outdoors' },
    { value: 'gift-cards', label: 'Gift Cards' },
    { value: 'grocery-gourment-foods', label: 'Grocery & Gourment Foods' },
    { value: 'health-personal-care', label: 'Health & Personal Care' },
    { value: 'home-kitchen', label: 'Home & kitchen' },
    { value: 'industrial-scientific', label: 'Industrial & Scientific' },
    { value: 'jewellery', label: 'Jewellery' },
    { value: 'kindle-store', label: 'Kindle Store' },
    { value: 'luggage-bags', label: 'Luggage & Bags' },
    { value: 'luxury-beauty', label: 'Luxury Beauty' },
    { value: 'movies-tvshows', label: 'Movies & TV Shows' },
    { value: 'mp3-music', label: 'MP3 Music' },
    { value: 'music', label: 'music' },
    { value: 'musical-instruments', label: 'Musical Instruments' },
    { value: 'office-products', label: 'Office Products' },
    { value: 'pet-suuplies', label: 'Pet Supplies' },
    { value: 'prime-video', label: 'Prime Video' },
    { value: 'shoes-handbags', label: 'Shoes & Handbags' },
    { value: 'software', label: 'Software' },
    { value: 'sports-fitness', label: 'Sports, Fitness & Outdoors' },
    { value: 'subscribe', label: 'Subscribe & Save' },
    { value: 'tools-home-improvement', label: 'Tools & Home Improvement' },
    { value: 'toys-games', label: 'Toys & Games' },
    { value: 'under-500', label: 'Under ₹500' },
    { value: 'video-games', label: 'Video Games' },
    { value: 'watches', label: 'Wathces' }
  ];

      useEffect(() => {
    updateSelectWidth();
  }, [selectedCategory]);

  const updateSelectWidth = () => {
    if (selectRef.current) {
        const selectedOption = selectRef.current.options[selectRef.current.selectedIndex];
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.font = window.getComputedStyle(selectRef.current).font;
        tempSpan.textContent = selectedOption.textContent;

        document.body.appendChild(tempSpan);
        const width = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        const calculatedWidth = Math.max(width + 30, 50)

        setSelectWidth(calculatedWidth);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSumbit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (

        <form onSubmit={handleSearchSumbit} id="nav-search">
              <select id="category" ref={selectRef} value={selectedCategory} onChange={handleCategoryChange} style={{width: `${selectWidth}px`}}>
              {categories.map(category => (
                  <option key={category.value} value={category.value}>
                      {category.label}
                  </option>
              ))}
          </select>
          <input type="text" placeholder="Search Amazon.in" id="search" value={searchQuery} onChange={handleSearchChange}/>
          <button id="search-btn">
              <img src="/images/search-icon.png" alt="search-icon"/>
          </button>
        </form>
  )
}

export default NavSearch;