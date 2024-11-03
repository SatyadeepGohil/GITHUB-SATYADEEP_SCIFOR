import { useCart } from './cartContext';
import { Link } from 'react-router-dom'
import { useAuth } from './authContext';
import NavSearch from "./navsearch";

function Header({ location }) {
    const { getTotalItemCount } = useCart();
    const { currentUser } = useAuth();

    return (
        <>
            <header>
                <Link to="/">
                    <img src="/images/amazon.svg" alt="amazon-logo" id="nav-logo"/>
                </Link>

                <div id="location-text">
                    <img src="/images/location.png" alt="location-icon" id="location-icon"/>
                    <span>
                        <p id="light-text">Deliver to {currentUser ? currentUser.name : 'Guest'}</p>
                        <p>{location}</p>
                    </span>
                </div>

                <NavSearch />

                <div id="nav-customer">
                    <div id="lang">
                            <img src="/images/india.png" alt="indian flag" />
                            <p>EN <i>&#x25BC;</i></p>
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

                    <div id="account">
                        <span id="account-arrow-head"></span>
                        <p>Hello, {currentUser ? currentUser.name : 'Guest'}</p>
                        <p>Account & Lists <i>&#x25BC;</i></p>

                        <div id="account-manager">
                            <span>
                                <a href="#">Who is Shopping? Select a profile.</a>
                                <a href="#">Manage Profiles <i>&gt;</i></a>
                            </span>
                            <div id="account-layout-wrapper">
                                        <div id="customer-lists">
                                        <h4>Your List</h4>
                                        <li><a href="#">Create a Wish List</a></li>
                                        <li><a href="#">Wish from Any Website</a></li>
                                        <li><a href="#">Baby Wishlist</a></li>
                                        <li><a href="#">Discover Your Style</a></li>
                                        <li><a href="#">Explore Showroom</a></li>
                                    </div>

                                    <div id="account-details">
                                        <h4>Your Account</h4>
                                        <li><a href="#">Your Account</a></li>
                                        <li><a href="#">Your Orders</a></li>
                                        <li><a href="#">Your Wish List</a></li>
                                        <li><a href="#">Keep shopping for</a></li>
                                        <li><a href="#">Your Recommedations</a></li>
                                        <li><a href="#">Recalls and Product Safety Alerts</a></li>
                                        <li><a href="#">Your Prime Membership</a></li>
                                        <li><a href="#">Your Prime Video</a></li>
                                        <li><a href="#">Your Subcribe & Save items</a></li>
                                        <li><a href="#">Memberships & Subcribtions</a></li>
                                        <li><a href="#">Your Seller Account</a></li>
                                        <li><a href="#">Content Library</a></li>
                                        <li><a href="#">Devices</a></li>
                                        <li><a href="#">Your Free Amazon Business Account</a></li>
                                        <li><a href="#">Switch Accounts</a></li>
                                        <li><a href="#">Sign Out</a></li>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div id="returns">
                        <p> <span>Returns</span> <br/> & Orders</p>
                    </div>
                    <Link to="/cart">
                        <div id="cart">
                            <img src="/images/cart.svg" alt="shopping cart"/>
                            <span>cart</span>
                            <p id="number-of-order">{getTotalItemCount()}</p>
                        </div>
                    </Link>

                </div>
        </header>
        </>
    )
}

export default Header;