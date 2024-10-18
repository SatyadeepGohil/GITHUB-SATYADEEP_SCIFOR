import React from "react";

function Footer() {
    return (
        <footer>
            <button onClick={() =>document.body.scrollTop = 0} id="back-to-top">Back to top</button>
            <div id="link-container">

                <div className="amazon-links">
                    <h5>Get to Know Us</h5>
                    <li><a href="#">About Amazon</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Press Releases</a></li>
                    <li><a href="#">Amazon Science</a></li>
                </div>

                <div className="amazon-links">
                    <h5>Connect with Us</h5>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="$">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                </div>

                <div className="amazon-links">
                    <h5>Make Money with Us</h5>
                    <li><a href="#">Sell on Amazon</a></li>
                    <li><a href="#">Sell under Amazon Accelerator</a></li>
                    <li><a href="#">Protect and Build Your Brand</a></li>
                    <li><a href="#">Amazon Global Selling</a></li>
                    <li><a href="#">Supply to Amazon</a></li>
                    <li><a href="#">Become an Affiliate</a></li>
                    <li><a href="#">Fulfilment by Amazon</a></li>
                    <li><a href="#">Adertise Your Products</a></li>
                    <li><a href="#">Amazon Pay on Merchants</a></li>
                </div>

                <div className="amazon-links">
                    <h5>Let Us Help You</h5>
                    <li><a href="#">Your Account</a></li>
                    <li><a href="#">Returns Centre</a></li>
                    <li><a href="#">Recalls and Product Safe Alerts</a></li>
                    <li><a href="#">100% Purchase Protection</a></li>
                    <li><a href="#">Amazon App Download</a></li>
                    <li><a href="#">Help</a></li>
                </div>
            </div>

            <hr />

            <div id="bottom-language-select">
                <img src="/images/bottom-logo.svg" alt="amazon-logo" id="bottom-logo"/>

                    <div id="bottom-lang">
                        <img src="/images/globe.png" alt="globe" id="globe"/>
                        English

                        <span>
                            <i>&#x25B2;</i>
                            <i>&#x25BC;</i>
                        </span>

                         <span id="arrow-head"></span>
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
                                <p id="shopping">
                                    <img src="/images/india.png" alt="" />
                                    You are shpping on Amazon.in
                                </p>
                                <a href="#" id="change-country">Change Country or region</a>
                            </div>
                    </div>

                    <button>
                        <img src="/images/india.png" alt="indian-flag" id="indian-flag"/>
                        India
                    </button>
            </div>

            <div id="bottom-links">

                <div>
                    <a href="#">
                    <span className="darktext">AbeBooks</span> <br />
                    Books,art & Collectibles
                    </a>

                    <a href="#">
                        <span className="darktext">Amazon Web Services</span> <br />
                        Scalable Cloud Computing Services
                    </a>

                    <a href="#">
                        <span className="darktext">Audible</span> <br />
                        Download Audio Books
                    </a>

                    <a href="#">
                        <span className="darktext">IMDb</span> <br />
                        Movies, TV & Celebrities
                    </a>

                </div>

                <div>
                    <a href="#">
                    <span className="darktext">Shopbop</span> <br />
                    Designer Fashion Brands
                    </a>

                    <a href="#">
                        <span className="darktext">Amazon Business</span> <br />
                        Everything For Your Business
                    </a>

                    <a href="#">
                        <span className="darktext">PrimeNow</span> <br />
                        2-Hour Delivery on Everyday items
                    </a>

                    <a href="#">
                        <span className="darktext">Amazon Prime Music</span> <br />
                        100 million songs, ad-free Over 15 million podcast episodes
                    </a>
                </div>

            </div>

            <span id="company-info">
                <a href="#">Conditions of Use & Sale</a>
                <a href="#">Privacy Notice</a>
                <a href="#">Interest-Based Ads</a>
            </span>

            <p id="copyright">&copy; 1996-2024, Amazon.com, Inc or its affiliates</p>
        </footer>
    )
}

export default Footer;