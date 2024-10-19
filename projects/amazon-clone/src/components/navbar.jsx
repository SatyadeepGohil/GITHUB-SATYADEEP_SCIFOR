import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
    const [isCategoryShowMore, setCategoryShowMore] = useState(false);
    const [isProgramShowMore, setProgramShowMore] = useState(false);

    const toggleCategory = () => {
        setCategoryShowMore(prevState => !prevState);
    }

    const toggleProgram = () => {
        setProgramShowMore(prevState => !prevState);
    };

    return (
        <>
        <nav>
            <button>
                <img src="/images/menu.png" alt="" /> All
            </button>
            <li><a href="#">Buy Again</a></li>
            <li><a href="#">Health, HouseHold & Personal Care</a></li>
            <li><a href="#">Sell</a></li>
            <li><a href="#">Mobiles</a></li>
            <li><a href="#">Amazon Pay</a></li>
            <li><a href="https://www.amazon.in/minitv?ref_=nav_avod_desktop_topnav">Mx Player</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">AmazonBasics</a></li>
            <li><a href="#">Gift Ideas</a></li>
            <li><a href="#">Browsing History <i>&#x25BC;</i></a></li>
            <li><a href="#">Customer Service</a></li>
            <li><a href="#">User's Amazon.in</a></li>
        </nav>

        <div id="side-menu">
            <p> <img src="/images/user-logo.png" alt="user-img" /> Hello, User</p>

            <span id="cross"></span>

            <div id="side-panel">
                    <h3>Trending</h3>
                <button>Best Sellers</button>
                <button>New Releases</button>
                <button>Movers and Shakers</button>

                <hr />

                <h3>Digital Content and Devices</h3>
                <button>Amazon miniTV-Free entertainment</button>
                <button>Echo & Alexa <i>&gt;</i></button>
                <button>Fire TV<i>&gt;</i></button>
                <button>Kindle E-Readers & eBooks <i>&gt;</i></button>
                <button>Audible Audiobooks <i>&gt;</i></button>
                <button>Amazon Prime Video <i>&gt;</i></button>
                <button>Amazon Prime Music <i>&gt;</i></button>

                <h3>Shop by Category</h3>
                <button>Mobile, Computers <i>&gt;</i></button>
                <button>TV, Appliances, Electronics <i>&gt;</i></button>
                <button>Men's Fashion <i>&gt;</i></button>
                <button>Women's Fashion <i>&gt;</i></button>

                {isCategoryShowMore && (
                    <div id="category-show-more">
                    <hr />
                    <button>Home, Kitchen, Pets <i>&gt;</i></button>
                    <button>Beauty, Health, Grocery <i>&gt;</i></button>
                    <button>Sports,Fitness,Bags,Luggage <i>&gt;</i></button>
                    <button>Toys,Baby Products,Kid's Fashion <i>&gt;</i></button>
                    <button>Car,Motorbike,Industrial <i>&gt;</i></button>
                    <button>Books <i>&gt;</i></button>
                    <button>Movies,Music & Video Games <i>&gt;</i></button>
                </div>
                )}

                <button onClick={toggleCategory} className="show-more">
                    {isCategoryShowMore ? (
                        <>
                            see less <i>&#708;</i>
                        </>
                    ) : (
                        <>
                            see more <i>&#709;</i>
                        </>
                    )}
                </button>

                <hr />

                <h3>Programs & Features</h3>
                <button>Amazon Pay</button>
                <button>Gift Cards & Mobile Recharges <i>&gt;</i></button>
                <button>Amazon Launchpad</button>
                <button>Amazon Business</button>

                {isProgramShowMore && (
                    <div id="programs-show-more">
                    <hr />
                    <button>Handloom and Handicrafts</button>
                    <button>Amazon Saheli</button>
                    <button>Amazon Combos</button>
                    <button>Amazon Custom</button>
                    <button>Flight Tickets</button>
                    <button>Buy more,Save more</button>
                    <button>Clearance store</button>
                    <button>International Brands</button>
                </div>
                )}

                <button onClick={toggleCategory} className="show-more">
                    {isProgramShowMore ? (
                        <>
                            see less &#708;
                        </>
                    ) : (
                        <>
                            see more &#709;
                        </>
                    )}
                </button>

                <hr />

                <h3>Help & Settings</h3>
                <button>Your Account</button>
                <button>Customer Service</button>
                <button>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default NavBar;