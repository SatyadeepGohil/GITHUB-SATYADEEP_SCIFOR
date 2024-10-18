import React, { useState, useRef, useEffect} from "react";

const NavSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectWidth, setSelectWidth] = useState(0);
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
    { value: 'books', label: 'Books' }
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

  return (
    
    <div id="nav-search" >
        <select id="category" ref={selectRef} value={selectedCategory} onChange={handleCategoryChange} style={{width: `${selectWidth}px`}}>
            {categories.map(category => (
                <option key={category.value} value={category.value}>
                    {category.label}
                </option>
            ))}
        </select>
        <input type="text" placeholder="Search Amazon.in" id="search"/>
        <button id="search-btn">
            <img src="/images/search-icon.png" alt="search-icon"/>
        </button>
        <i></i>
    </div>
  )
}

export default NavSearch;