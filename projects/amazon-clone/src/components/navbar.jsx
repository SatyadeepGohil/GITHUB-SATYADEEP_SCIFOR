import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
    const [isCategoryShowMore, setCategoryShowMore] = useState(false);
    const [isProgramShowMore, setProgramShowMore] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isMenuOpen, setisMenuOpen] = useState(false);

    const toggleMenu = () => {
        setisMenuOpen(prevState => !prevState);
    };

    const toggleCategory = () => {
        setCategoryShowMore(prevState => !prevState);
    };

    const toggleProgram = () => {
        setProgramShowMore(prevState => !prevState);
    };

    const toggleSubMenu = (menu) => {
        if (activeSubMenu === menu) {
            setActiveSubMenu(null); // Close the submenu if it's already open
        } else {
            setActiveSubMenu(menu); // Open the selected submenu
        }
    };

    const returnToMainMenu = () => {
        setActiveSubMenu(null);
    };

    const SUBMENUS = {
  "echo": {
    title: "Echo & Alexa",
    sections: [
      {
        title: null,
        items: ["See all devices with Alexa"]
      },
      {
        title: "Content & Resources",
        items: [
          "Meet Alexa",
          "Alexa Skills",
          "Alexa App",
          "Alexa Smart Home",
          "Amazon Prime Music"
        ]
      }
    ]
  },
  "fire-tv": {
    title: "Fire TV",
    sections: [
      {
        title: null,
        items: [
          "Amazon Prime Video",
          "Fire TV Apps & Games",
          "See all Fire TV devices"
        ]
      }
    ]
  },
  "kindle": {
    title: "Kindle E-readers",
    sections: [
      {
        title: null,
        items: [
          "All-new-kindle",
          "All-new Kindle Paperwhite",
          "Kindle Paperwhite Starter Pack",
          "All-New Kindle Oasis",
          "Refurbished & Open Box",
          "Kindle E-reader Accessories",
          "See all Kindle E-readers"
        ]
      },
      {
        title: "Kindle ebooks",
        items: [
          "All Kindle ebooks",
          "Prime Reading",
          "Kindle Unlimited",
          "Deals on Kindle eBooks",
          "Kindle Exam Central",
          "Kindle eTextbooks",
          "eBooks Bestsellers",
          "eBooks in Indian Languages",
          "Hindi",
          "Tamil"
        ]
      }
    ]
  },
  "audible": {
    title: "Audible Audiobooks",
    sections: [
      {
        title: null,
        items: [
          "Audible Membership",
          "All Audiobooks",
          "Best Sellers",
          "New Releases",
          "Hindi Audiobooks"
        ]
      }
    ]
  },
  "prime-video": {
    title: "Amazon Prime Video",
    sections: [
      {
        title: null,
        items: [
          "All Videos",
          "Categories",
          "My Stuff"
        ]
      }
    ]
  },
  "prime-music": {
    title: "Amazon Prime Music",
    sections: [
      {
        title: null,
        items: [
          "Amazon Prime Music",
          "Open web player",
          "Voice controlled with Alexa",
          "Amazon Prime Music Apps",
          "CDs and Vinyls"
        ]
      }
    ]
  },
  "mobile": {
    title: "Mobiles, Tablets & More",
    sections: [
      {
        title: null,
        items: [
          "All Mobile Phones",
          "All Mobile Accessories",
          "Cases & Covers",
          "Screen Protectors",
          "Power Banks",
          "Refurbished & Open Box",
          "Tablets",
          "Wearable Devices",
          "Smart Home",
          "Office Supplies & Stationery",
          "Software"
        ]
      },
      {
        title: "Computers & Accessories",
        items: [
          "All Computers & Accessories",
          "Laptops",
          "Drive & Storage",
          "Printers & Ink",
          "Networking Devices",
          "Computer Accessories",
          "Game Zone",
          "Monitors",
          "Desktops",
          "Components",
          "All Electronics"
        ]
      }
    ]
  },
  "electronics": {
    title: "TV, Audio & Cameras",
    sections: [
      {
        title: null,
        items: [
          "Televisions",
          "Home Entertainment Systems",
          "Headphones",
          "Speakers",
          "Home Audio & Theater",
          "DSLR Cameras",
          "Security Cameras",
          "Camera Accessories",
          "Musical Instruments & Professional Audio",
          "Gaming Consoles",
          "All Electronics"
        ]
      },
      {
        title: "Appliances",
        items: [
          "Air Conditioners",
          "Refrigerators",
          "Washing Machines",
          "Kitchen & Home Appliances",
          "All Appliances"
        ]
      }
    ]
  },
  "men-fashion": {
    title: "Men's Clothing",
    sections: [
      {
        title: null,
        items: [
          "Clothing",
          "T-shirts & Polos",
          "Shirts",
          "Jeans",
          "Innerwear"
        ]
      },
      {
        title: "Accessories",
        items: [
          "Watches",
          "Bags & Luggage",
          "Sunglasses",
          "Jewellery",
          "Wallets"
        ]
      },
      {
        title: "Men's Shoes",
        items: [
          "Shoes",
          "Sports Shoes",
          "Formal Shoes",
          "Casual Shoes"
        ]
      },
      {
        title: "Stores",
        items: [
          "Sportswear",
          "The Designer Boutique",
          "Men's Fashion",
          "Amazon Fashion",
          "Men's Handlooms",
          "Fashion Sales & Deals"
        ]
      }
    ]
  },
  "women-fashion": {
    title: "Women's Clothing",
    sections: [
      {
        title: null,
        items: [
          "Clothing",
          "Western Wear",
          "Ethnic Wear",
          "Lingerie & Nightwear",
          "Top Brands"
        ]
      },
      {
        title: "Accessories",
        items: [
          "Watches",
          "Handbags & Clutches",
          "Gold & Diamond Jewellery",
          "Fashion & Silver Jewellery",
          "Sunglasses"
        ]
      },
      {
        title: "Women's Shoes",
        items: [
          "Shoes",
          "Fashion Sandals",
          "Ballerinas"
        ]
      },
      {
        title: "The Designer Boutique",
        items: [
          "Handloom & Handicraft Store",
          "Sportswear",
          "Women's Fashion",
          "Amazon Fashion",
          "Fashion Sales & Deals"
        ]
      }
    ]
  },
  "home": {
    title: "Home & Kitchen",
    sections: [
      {
        title: null,
        items: [
          "Explore Showroom",
          "Kitchen & Dining",
          "Kitchen Storage & Containers",
          "Furniture",
          "Fine Art",
          "Home Furnishing",
          "Bedroom Linen",
          "Home Décor",
          "Garden & Outdoors",
          "Home Storage",
          "Indoor Lighting",
          "Home Improvement",
          "Sewing & Craft Supplies",
          "All Home & Kitchen",
          "Shop by Room",
          "Home & Kitchen Deals"
        ]
      },
      {
        title: "Pet Supplies",
        items: [
          "All Pet Supplies",
          "Dog Supplies"
        ]
      },
      {
        title: "Home, Kitchen, Pets",
        items: [
          "Refurbished & Open Box"
        ]
      }
    ]
  },
  "health": {
    title: "Beauty & Health",
    sections: [
      {
        title: null,
        items: [
          "Beauty & Grooming",
          "Luxury Beauty",
          "Make-up",
          "Health & Personal Care",
          "Amazon Pharmacy",
          "Household Supplies",
          "Personal Care Appliances",
          "Diet & Nutrition",
          "Subscribe & Save",
          "Value Bazaar"
        ]
      },
      {
        title: "Grocery & Gourmet Foods",
        items: [
          "All Grocery & Gourmet Foods",
          "Coffee, Tea & Beverages",
          "Snack Foods"
        ]
      }
    ]
  },
  "fitness": {
    title: "Sports & Fitness",
    sections: [
        {
            title: null,
            items: [
                "Cricket",
                "Badminton",
                "Cycling",
                "Football",
                "Running",
                "Camping & Hiking",
                "Fitness Accessories",
                "Yoga",
                "Strength Training",
                "Cardio Equiment",
                "Sports Collectibles",
                "Refurbished & Open Box",
                "All Exercise & Fitness",
                "All Sports, Fitness & Outdoors"
            ]
        },
        {
            title: "Bad & Luggage",
            items: [
                "Backpacks",
                "Rucksacks",
                "Suitcases & Trolley Bags",
                "Travel Duffles",
                "Travel Accessories",
                "Wallets"
            ]
        }
    ]
  },
  "toy": {
    title: "Toys & Baby Products",
    sections: [
        {
            title: null,
            items: [
                "Toys & Games",
                "Baby Products",
                "Diapers",
                "Toys Gifting Store",
                "STEM Toys Store",
                "International Toy Store",
                "Baby Bath, SKin & Grooming",
                "Strollers & Prams",
                "Nursing & Feeding",
                "Subscribe & Save",
                "Pantry"
            ]
        },
        {
            title: "Kid's Fashion",
            items: [
                "Kid's Clothing",
                "Kid's Shoes",
                "School Bags",
                "Kid's Watches",
                "Kid's Fashion",
                "Baby Fashion"
            ]
        }
    ]
  },
  "car": {
    title: "Car & Motorbike",
    sections: [
        {
            title: null,
            items: [
                "Motorbike Accessories & Parts",
                "Car Accessories",
                "Car Electronics",
                "Car Parts",
                "Car & Bike Care",
                "All Car & Motorbike Products"
            ]
        },
        {
            title: "Industrial Supplies",
            items: [
                "Industrial & Scientific Supplies",
                "Test, Measure & Inspect",
                "Lab & Scientific",
                "Janitorial & Sanitational Supplies"
            ]
        }
    ]
  },
  "book": {
    title: "Books",
    sections: [
        {
            title: null,
            items: [
                "All Books",
                "Fiction Books",
                "Editior's Corner",
                "School Textbooks",
                "Children's Books",
                "Exam Central",
                "Textbooks",
                "Indian Language Books",
                "kindle eBooks"
            ]
        },
        {
            title: "Audible Audiobooks",
            items: [
                "Audible Audiobooks & more",
                "Audible Membership"
            ]
        }
    ]
  },
  "entertainment": {
    title: "Movies & TV Shows",
    sections: [
        {
            title: null,
            items: [
                "All Movies & TV Shows",
                "Blu-ray",
                "All English",
                "All Hindi",
                "Entertainment Collectives"
            ]
        },
        {
            title: "Video Games",
            items: [
                "Gaming Consoles",
                "Latest Video Games",
                "Gaming Accessories",
                "PC Games",
                "Video Games",
                "All Video Games"
            ]
        },
        {
            title: "Music",
            items: [
                "All Music",
                "International Music",
                "Film Songs",
                "Indian Classical",
                "Musical Instruments & Professional Audio"
            ]
        },
        {
            title: "Stream Music",
            items: [
                "Open web player",
                "Amazon Prime Music"
            ]
        }
    ]
  },
  "gift-cards": {
    title: "Gift Cards",
    sections: [
        {
            title: null,
            items: [
                "All Gift Cards",
                "Popular Gift Cards",
                "Gift Boxes, Gift Tags, Greeting Cards",
                "Popular Brand Gift Vouchers",
                "Birthday Gift Cards",
                "Wedding & Anniversary",
                "Best Wishes & Thank You",
                "Corporate Gift Cards"
            ],
        },
        {
            title: "Recharges",
            items: [
                "Mobile Recharges"
            ]
        }
    ]
  }
};


const SubMenuSection = ({ section }) => {
    return (
        <> 
            {section.title && (
                <>
                    <h3>{section.title}</h3>
                    <hr />
                </>
            )}
            {section.items.map((item, index) => (
                <button key={index}>{item}</button>
            ))}
        </>
    );
};

const renderActiveSubmenu = () => {
    if (!activeSubMenu || !SUBMENUS[activeSubMenu]) return null;

    const submenudata = SUBMENUS[activeSubMenu];

    return (
        <div className="sub-menu" style={{transform: `translateX(${activeSubMenu ? '-200px' : '0'})`}}>
            <button onClick={returnToMainMenu}>&#x2190; MAIN MENU</button>
            <hr />
            <h3>{submenudata.title}</h3>
            <hr />
            {submenudata.sections.map((section, index) => (
                <SubMenuSection key={index} section={section} />
            ))}
        </div>
    )
}

    return (
        <>
            <nav>
                <button onClick={toggleMenu}>
                    <img src="/images/menu.png" alt="" /> All
                </button>
                <ul>
                    <li><Link to="/">Buy Again</Link></li>
                    <li><Link to="/">Health, HouseHold & Personal Care</Link></li>
                    <li><Link to="/">Sell</Link></li>
                    <li><Link to="/">Mobiles</Link></li>
                    <li><Link to="/">Amazon Pay</Link></li>
                    <li><Link to="https://www.amazon.in/minitv?ref_=nav_avod_desktop_topnav">Mx Player</Link></li>
                    <li><Link to="/">Gift Cards</Link></li>
                    <li><Link to="/">AmazonBasics</Link></li>
                    <li><Link to="/">Gift Ideas</Link></li>
                    <li><Link to="/">Browsing History <i>&#x25BC;</i></Link></li>
                    <li><Link to="/">Customer Service</Link></li>
                    <li><Link to="/">User's Amazon.in</Link></li>
                </ul>
            </nav>

            {isMenuOpen && (
                <div id="overlay" className={isMenuOpen ? 'show' : ''}></div>
            )}

            <div id="menu-container" style={{ transform: `translateX(${isMenuOpen ? '0' : '-100%'})` }}>
                <p id="user-name"><img src="/images/user-logo.png" alt="user-img" /> Hello, User</p>
                <button onClick={toggleMenu} id="cross">&#10006;</button>
                <div id="side-menu" style={{ transform: `translateX(${activeSubMenu ? '-200px' : '0'})` }}>

                    <div id="side-panel">
                        <h3>Trending</h3>
                        <button>Best Sellers</button>
                        <button>New Releases</button>
                        <button>Movers and Shakers</button>

                        <hr />

                        <h3>Digital Content and Devices</h3>
                        <button>Amazon miniTV-Free entertainment</button>
                        <button onClick={() => toggleSubMenu('echo')}>Echo & Alexa <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('fire-tv')}>Fire TV<i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('kindle')}>Kindle E-Readers & eBooks <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('audible')}>Audible Audiobooks <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('prime-video')}>Amazon Prime Video <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('prime-music')}>Amazon Prime Music <i>&gt;</i></button>

                        <h3>Shop by Category</h3>
                        <button onClick={() => toggleSubMenu('mobile')}>Mobile, Computers <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('electronics')}>TV, Appliances, Electronics <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('men-fashion')}>Men's Fashion <i>&gt;</i></button>
                        <button onClick={() => toggleSubMenu('women-fashion')}>Women's Fashion <i>&gt;</i></button>

                        {isCategoryShowMore && (
                            <div id="category-show-more">
                                <hr />
                                <button onClick={() => toggleSubMenu('home')}>Home, Kitchen, Pets <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('health')}>Beauty, Health, Grocery <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('fitness')}>Sports,Fitness,Bags,Luggage <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('toy')}>Toys,Baby Products,Kid's Fashion <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('car')}>Car,Motorbike,Industrial <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('book')}>Books <i>&gt;</i></button>
                                <button onClick={() => toggleSubMenu('entertainment')}>Movies,Music & Video Games <i>&gt;</i></button>
                            </div>
                        )}

                        <button onClick={toggleCategory} className="show-more">
                            {isCategoryShowMore ? (
                                <>see less <i>&#708;</i></>
                            ) : (
                                <>see more <i>&709;</i></>
                            )}
                        </button>

                        <hr />

                        <h3>Programs & Features</h3>
                        <button>Amazon Pay</button>
                        <button onClick={() => toggleSubMenu('gift-cards')}>Gift Cards & Mobile Recharges <i>&gt;</i></button>
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
                                <button>Buy more, Save more</button>
                                <button>Clearance store</button>
                                <button>International Brands</button>
                            </div>
                        )}

                        <button onClick={toggleProgram} className="show-more">
                            {isProgramShowMore ? (
                                <>see less &#708;</>
                            ) : (
                                <>see more &#709;</>
                            )}
                        </button>

                        <hr />

                        <h3>Help & Settings</h3>
                        <button>Your Account</button>
                        <button>Customer Service</button>
                        <button>Sign Out</button>
                    </div>
                </div>

                {renderActiveSubmenu()}
            </div>
        </>
    );
}

export default NavBar;
