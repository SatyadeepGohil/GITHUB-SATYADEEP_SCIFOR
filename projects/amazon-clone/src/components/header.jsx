import React from "react";

function Header() {
    return (
        <>
            <header>
                <img src="/images/amazon.svg" alt="amazon-logo" id="nav-logo"/>
            {/* later add a location functionalityand a location image here */}

                <div id="location-text">
                    <img src="/images/location.png" alt="location-icon" id="location-icon"/>
                    <span>
                        <p>Deliver to John</p>
                        <p>Las vegas 361005</p>
                    </span>
                </div>

                <div id="nav-search">
                    <select name="category" id="category">
                        <option value="all">All</option>
                        <option value="alexa-skills">Alexa Skills</option>
                    </select>
                    <input type="text" id="search" placeholder="Search Amazon.in"/>
                    <button id="search-btn">
                        <img src="/images/search-icon.png" alt="search-icon" />
                    </button>
                </div>

                <div id="nav-customer">
                    <div id="lang">
                            <img src="/images/india.png" alt="indian flag" />
                            <p>En <i>&#x25BC;</i></p>
                    </div>
                </div>
        </header>
        
        <div id="language-options">
            <span id="arrow"></span>
            <label>
            <input type="radio" value="EN" name="language"/> 
            <a href="#">English-EN</a>
            </label>
            <label>
                <input type="radio" value="HI" name="language"/>
                 <a href="#">English-EN</a>
            </label>
            <label>
                <input type="radio" value="TA" name="language"/>
                 <a href="#"> தமிழ்-TA</a>
            </label>
            <label>
                <input type="radio" value="TE" name="language"/>
                 <a href="#">తెలుగు-TE</a>
            </label>
            <label>
                <input type="radio" value="KN" name="language"/>
                 <a href="#">ಕನ್ನಡ-KN</a>
            </label>
            <label>
                <input type="radio" value="ML" name="language"/> 
                 <a href="#">മലയാളം-ML</a>
            </label>
            <label>
                <input type="radio" value="BN" name="language"/> 
                 <a href="#">বাংলা-BN</a>
            </label>
            <label>
                <input type="radio" value="MR" name="language"/> 
                 <a href="#">मराठी-MR</a>
            </label>

            <a href="#">Learn More</a>
            You are shpping on Amazon.in
            <a href="#">Change Country or region</a>
        </div>
        </>
    )
}

export default Header;