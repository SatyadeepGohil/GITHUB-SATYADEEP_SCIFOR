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
                            <span id="arrow"></span>

                            <div id="language-options">
                                <label>
                                <input type="radio" value="EN" name="language"/> 
                                <a href="#" className="language-links">English-EN</a>
                                </label>
                                <label>
                                    <input type="radio" value="HI" name="language"/>
                                        <a href="#"  className="language-links">हिन्दी-HI</a>
                                </label>
                                <label>
                                    <input type="radio" value="TA" name="language"/>
                                        <a href="#"  className="language-links"> தமிழ்-TA</a>
                                </label>
                                <label>
                                    <input type="radio" value="TE" name="language"/>
                                        <a href="#"  className="language-links">తెలుగు-TE</a>
                                </label>
                                <label>
                                    <input type="radio" value="KN" name="language"/>
                                        <a href="#"  className="language-links">ಕನ್ನಡ-KN</a>
                                </label>
                                <label>
                                    <input type="radio" value="ML" name="language"/> 
                                        <a href="#"  className="language-links">മലയാളം-ML</a>
                                </label>
                                <label>
                                    <input type="radio" value="BN" name="language"/> 
                                        <a href="#"  className="language-links">বাংলা-BN</a>
                                </label>
                                <label>
                                    <input type="radio" value="MR" name="language"/> 
                                        <a href="#"  className="language-links">मराठी-MR</a>
                                </label>

                                <a href="#" id="learn-more">Learn More</a>
                                You are shpping on Amazon.in
                                <a href="#" id="change-country">Change Country or region</a>
                            </div>
                    </div>

                    <div id="account">
                        <p>Hello, John</p>
                        <p>Account & Lists <i>&#x25BC;</i></p>
                    </div>
                </div>
        </header>
        </>
    )
}

export default Header;