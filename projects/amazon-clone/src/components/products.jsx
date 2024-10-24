import { useEffect, useState, useRef } from "react";

const useCarousel = (items, itemsToShow) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const itemRef = useRef(null);

    useEffect(() => {
        if (itemRef.current) {
            setItemWidth(itemRef.current.offsetWidth);
        }

        // Handle resizing
        const handleResize = () => {
            if (itemRef.current) {
                setItemWidth(itemRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + itemsToShow;
            return nextIndex >= items.length ? prevIndex : nextIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex - itemsToShow;
            return nextIndex < 0 ? 0 : nextIndex;
        });
    };

    return {
        currentIndex,
        nextSlide,
        prevSlide,
        isFirstSlide: currentIndex === 0,
        isLastSlide: currentIndex >= items.length - itemsToShow,
        itemRef,
        itemWidth,
    };
};

const CategoryCarousel = () => {
    const categoryImages = [
        "/images/category-1.jpg",
        "/images/category-2.jpg",
        "/images/category-3.jpg",
        "/images/category-4.jpg",
        "/images/category-5.jpg",
        "/images/category-6.jpg",
        "/images/category-7.jpg",
        "/images/category-8.jpg",
        "/images/category-9.png"
    ];

    const ItemsToShow = 3;
    const { currentIndex, nextSlide, prevSlide, isFirstSlide, isLastSlide, itemRef, itemWidth } = useCarousel(categoryImages, ItemsToShow);

    return (
        <div className="carousel">
            <span>
                <h1>Shop deals in top categories</h1>
                <a href="#">Explore all categories</a>
            </span>

            <div
                className="carousel-image-container"
                style={{
                    transition: "transform 0.3s ease",
                    transform: `translateX(-${currentIndex * itemWidth}px)`
                }}
            >
                {categoryImages.map((categoryImage, index) => (
                    <div key={index} ref={index === 0 ? itemRef : null}>
                         <img src={categoryImage} alt={`Category ${index + 1}`}
                    />
                    </div>
                ))}
            </div>

            <button onClick={prevSlide} disabled={isFirstSlide} className="carousel-previous">&lt;</button>
            <button onClick={nextSlide} disabled={isLastSlide} className="carousel-next">&gt;</button>
        </div>
    );
};

const ProductCarousel = () => {
    const productImages = [
        "/images/product-carousel-1.jpg",
        "/images/product-carousel-2.jpg",
        "/images/product-carousel-3.jpg",
        "/images/product-carousel-4.jpg",
        "/images/product-carousel-5.jpg",
        "/images/product-carousel-6.jpg",
        "/images/product-carousel-7.jpg",
        "/images/product-carousel-8.jpg",
        "/images/product-carousel-9.jpg",
        "/images/product-carousel-10.jpg",
        "/images/product-carousel-11.jpg",
        "/images/product-carousel-12.jpg",
        "/images/product-carousel-13.jpg",
        "/images/product-carousel-14.jpg",
        "/images/product-carousel-15.jpg",
    ];

    const ItemsToShow = 3;
    const { currentIndex, nextSlide, prevSlide, isFirstSlide, isLastSlide, itemRef, itemWidth } = useCarousel(productImages, ItemsToShow);

    return (
        <div className="carousel">
            <span>
                <h1>Minimum 50% off | Home,kitchen & outdoors</h1>
                <a href="#">See all offers</a>
            </span>

            <div
                className="carousel-image-container"
                style={{
                    transition: "transform 0.3s ease",
                    transform: `translateX(-${currentIndex * itemWidth}px)`
                }}
            >
                {productImages.map((productImage, index) => (
                    <div key={index} ref={index === 0 ? itemRef : null}>
                         <img src={productImage} alt={`product ${index + 1}`}
                    />
                    </div>
                ))}
            </div>

            <button onClick={prevSlide} disabled={isFirstSlide} className="carousel-previous">&lt;</button>
            <button onClick={nextSlide} disabled={isLastSlide} className="carousel-next">&gt;</button>
        </div>
    );
};


const Products = () => {

    return (
        <>
            <div id="products-container">

                <div className="card">
                    <h1>New deals added everyday</h1>
                    <img src="/images/shop-all-deals.jpg" alt="shop all deals image" />
                    <a href="#">Explore now</a>
                </div>

                <div className="card four-images">
                    <h1>Keep shopping for</h1>

                    <div>
                        <figure>
                            <img src="/images/keep-shopping-shoe.jpg" alt="" />
                            <figcaption>Men's running shoes</figcaption>
                            <p>5 viewed</p>
                        </figure>
                        <figure>
                            <img src="/images/keep-shopping-serums.jpg" alt="" />
                            <figcaption>Serum's</figcaption>
                            <p>2 viewed</p>
                        </figure>
                        <figure>
                            <img src="/images/keep-shopping-face-creams.jpg" alt="" />
                            <figcaption>Face creams</figcaption>
                            <p>1 viewed</p>
                        </figure>
                        <figure>
                            <img src="/images/keep-shopping-vitamins.jpg" alt="" />
                            <figcaption>vitamins</figcaption>
                            <p>2 viewed</p>
                        </figure>
                    </div>

                    <a href="#">View your browsing history</a>
                </div>

                <div className="card four-images">
                    <h1>Deals based on your shopping trends</h1>

                    <div>
                        <figure>
                            <img src="/images/shopping-trends-bicylcle-1.jpg" alt="" />
                            <figcaption>
                                <span id="discount">36% off</span>
                                Great Indian Festival
                            </figcaption>
                        </figure>
                        <figure>
                            <img src="/images/shopping-trends-helmet.jpg" alt="" />
                            <figcaption>
                                <span id="discount">66% off</span>
                                Great Indian Festival
                            </figcaption>
                        </figure>
                        <figure>
                            <img src="/images/shopping-trends-bicycle-3.jpg" alt="" />
                            <figcaption>
                                <span id="discount">66% off</span>
                                Great Indian Festival
                            </figcaption>
                        </figure>
                        <figure>
                            <img src="/images/shopping-trends-bicycle-2.jpg" alt="" />
                            <figcaption>
                                <span id="discount">62% off</span>
                                Great Indian Festival
                            </figcaption>
                        </figure>
                    </div>
                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Minimum 50% off | Home, Kitchen & more</h1>

                    <div>
                        <figure>
                            <img src="/images/kitchen-appliance.jpg" alt="" />
                            <figcaption>Kitchen appliance</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/home-decor.jpg" alt="" />
                            <figcaption>Home decor</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/furniture.jpg" alt="" />
                            <figcaption>Furniture</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/home-improvement.jpg" alt="" />
                            <figcaption>Home imporvemnet</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Minimum 60% off | Deals on Amazon brands & more</h1>

                    <div>
                        <figure>
                            <img src="/images/PC_Lifestyle_QC_186x116_2._SY116_CB543430576_.jpg" alt="" />
                            <figcaption>Starting ₹129 | Home decor</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_Lifestyle_QC_186x116_3._SY116_CB543430576_.jpg" alt="" />
                            <figcaption>Min 60% off | Cookware</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_Lifestyle_QC_186x116._SY116_CB543428645_.jpg" alt="" />
                            <figcaption>Starting ₹119 | Dry fruits</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_Lifestyle_QC_186x116-200111._SY116_CB543322898_.jpg" alt="" />
                            <figcaption>Minimum 60% off | Top rated products</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Starting ₹299 | Latest styles from top brands</h1>

                    <div>
                        <figure>
                            <img src="/images/kurtas.jpg" alt="" />
                            <figcaption>kurtas</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Tops.jpg" alt="" />
                            <figcaption>Tops</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/dresses.jpg" alt="" />
                            <figcaption>Dresses</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/sarees.jpg" alt="" />
                            <figcaption>Sarres</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Up to 70% off | Deals on gaming consoles & more</h1>

                    <div>
                        <figure>
                            <img src="/images/console-game.jpg" alt="" />
                            <figcaption>Up to 60% off | PlayStation 5 games</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/colorful-game-controller.jpg" alt="" />
                            <figcaption>Up to 40% off | Controllers</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/D168739138_PC_QC_1_1x._SY116_CB545076977_.jpg" alt="" />
                            <figcaption>Flat ₹5,000 off | PlayStation 5 Slim</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/D168739138_PC_QC_4_1x._SY116_CB545076977_.jpg" alt="" />
                            <figcaption>Flat ₹5000 off | PS5 Slim Digital edition</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Up to 50% off | Sports, outdoor & more</h1>

                    <div>
                        <figure>
                            <img src="/images/sports-fitness.jpg" alt="" />
                            <figcaption>Sports & fitness</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/automative.jpg" alt="" />
                            <figcaption>Automotive</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/tools.jpg" alt="" />
                            <figcaption>Tools</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/garden-outdoors.jpg" alt="" />
                            <figcaption>Garden & outdoor</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Up to 60% off | Bestselling gaming accessories</h1>

                    <div>
                        <figure>
                            <img src="/images/D169283036_PC_QC_1_1x._SY116_CB543329649_.jpg" alt="" />
                            <figcaption>Starting ₹599 | Headphones</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/D169283036_PC_QC_1x._SY116_CB543365771_.jpg" alt="" />
                            <figcaption>Up to 40% off | Controllers</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/D169283036_PC_QC_3_1x._SY116_CB543329649_.jpg" alt="" />
                            <figcaption>Starting ₹499 | Trending speakers</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/D169283036_PC_QC_2_1x._SY116_CB543329649_.jpg" alt="" />
                            <figcaption>Up to 50% off | Virtual reality</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Extra 10% cashback on business purchases</h1>

                    <div>
                        <figure>
                            <img src="/images/PC_QC_Tile_4_186_116-min_1._SY116_CB543316013_.jpg" alt="" />
                            <figcaption>Up to 40% off | Televisions</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_QC_Tile_1_186_116-min_1._SY116_CB543316013_.jpg" alt="" />
                            <figcaption>Up to 60% off | Remote fans</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_QC_Tile_2_186_116-min_1._SY116_CB543316013_.jpg" alt="" />
                            <figcaption>Up to 65% off | Kitchen appliances</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/PC_QC_Tile_3_186_116-min_1._SY116_CB543316013_.jpg" alt="" />
                            <figcaption>Up to 50% off | Office furnitures</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div id="flight-booking">
                    <img src="/images/flight-booking.jpg" alt="flying plane image" />
                </div>

                <ProductCarousel />

                <div className="card four-images">
                    <h1>Style & innovation from Small Business</h1>

                    <div>
                        <figure>
                            <img src="/images/Desktop_QC_1_NAM_revised_1x_Decor._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 55% off | Home decor</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_1_NAM_revised_1x_Fashion_Accessories._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 75% off | Fashion accessories</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_1_NAM_revised_1x_Furniture._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 60% off Furniture</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_1_NAM_revised_1x_Electronics._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 70% Electronics accessories</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Up to 75% off | Refurbished products</h1>

                    <div>
                        <figure>
                            <img src="/images/laptops.jpg" alt="" />
                            <figcaption>Laptops</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/mobiles.jpg" alt="" />
                            <figcaption>Mobiles</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/headphones.jpg" alt="" />
                            <figcaption>Headphones</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/home-kitchen-appliances.jpg" alt="" />
                            <figcaption>Home & Kitchen</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Collections from Emerging Businesses</h1>

                    <div>
                        <figure>
                            <img src="/images/Lamps_1.1._SY116_CB562332080_.jpg" alt="" />
                            <figcaption>Up to 55% off | Lamps & lights</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Furniture_1.2._SY116_CB562332080_.jpg" alt="" />
                            <figcaption>Up to 70% off | Furnishing</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Electronics_1.3._SY116_CB562332080_.jpg" alt="" />
                            <figcaption>Up to 60% off | Electronics</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Home_1.4._SY116_CB562332080_.jpg" alt="" />
                            <figcaption>Up to 65% off | Home decor</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Starting ₹299 | Bestselling styles from top brands</h1>

                    <div>
                        <figure>
                            <img src="/images/Tshirts_and_polos.jpg" alt="" />
                            <figcaption>T-shirts & polos</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Casual_shirt.jpg" alt="" />
                            <figcaption>Casuals shirts</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Jeans.jpg" alt="" />
                            <figcaption>Classic jeans</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/workwear-classics.jpg" alt="" />
                            <figcaption>Workwear classics</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all deals</a>
                </div>

                <div className="card four-images">
                    <h1>Festive collection by artisans & brands</h1>

                    <div>
                        <figure>
                            <img src="/images/phase3_furnish_186._SY116_CB545098456_.jpg" alt="" />
                            <figcaption>Handcrafted items from artisans</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/phase3_furniture_186._SY116_CB545097934_.jpg" alt="" />
                            <figcaption>Items from woemen led businesses</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/phase3_decor_186._SY116_CB545098343_.jpg" alt="" />
                            <figcaption>Government emporium products</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/phase3_diya_186._SY116_CB545098676_.jpg" alt="" />
                            <figcaption>Unique finds from artisans</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Festive essential from Small Businesses</h1>

                    <div>
                        <figure>
                            <img src="/images/Desktop_QC_2_NAM_revised_1x_Ethnic_wears._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 70% off | Ethnic wears</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_2_NAM_revised_1x_lights_Lamps._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 60% off | Lights ^ Lamps</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_2_NAM_revised_1x_Furnishings._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 55% off | Furnishings</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/Desktop_QC_2_NAM_revised_1x_Pooja_Essentials._SY116_CB562451660_.jpg" alt="" />
                            <figcaption>Up to 60% off | Pooja essentials</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>

                <div className="card">
                    <h1>Up to 40% off | Deals on mobiles and accessories</h1>
                    <img src="/images/galaxy-s24-ultra.jpg" alt="" />

                    <a href="#">See all offers</a>
                </div>

                <div className="card four-images">
                    <h1>Deals on top smartphone brands</h1>

                    <div>
                        <figure>
                            <img src="/images/apple.jpg" alt="" />
                            <figcaption>Up to 20% off</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/oneplus.jpg" alt="" />
                            <figcaption>Savings up to ₹40,000</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/iqoo.jpg" alt="" />
                            <figcaption>Savings up to ₹16,800</figcaption>
                        </figure>
                        <figure>
                            <img src="/images/realme.jpg" alt="" />
                            <figcaption>Up to 35% off</figcaption>
                        </figure>
                    </div>

                    <a href="#">See all offers</a>
                </div>
                
                <CategoryCarousel/>
            </div>
        </>
    )
}

export default Products;