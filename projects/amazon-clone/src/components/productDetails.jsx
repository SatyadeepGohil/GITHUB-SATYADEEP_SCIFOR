import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import { useCart } from "./cartContext";
import { useBrowsingHistory } from "./browserHistoryContext";

function renderStars(rating) {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full star with gold color and proper spacing
      stars.push(
        <span 
          key={i}
          style={{
            color: '#FFD700',
            fontSize: '1.2rem',
            marginRight: '2px'
          }}
          role="img" 
          aria-label="full star"
        >
          ★
        </span>
      );
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half star
      stars.push(
        <span 
          key={i}
          style={{
            color: '#FFD700',
            fontSize: '1.2rem',
            marginRight: '2px',
            position: 'relative'
          }}
          role="img"
          aria-label="half star"
        >
          <span style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>★</span>
          <span style={{ color: '#D3D3D3' }}>☆</span>
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span 
          key={i}
          style={{
            color: '#D3D3D3',
            fontSize: '1.2rem',
            marginRight: '2px'
          }}
          role="img"
          aria-label="empty star"
        >
          ☆
        </span>
      );
    }
  }

  return (
    <div title={`Rating: ${rating} out of 5`} style={{ display: 'inline-flex', alignItems: 'center' }}>
        {stars}
    </div>
  );
}

function ProductDetails({ location }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredImage, setHoveredImage] = useState('');
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const { addToBrowsingHistory } = useBrowsingHistory();
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const mainImageRef = useRef(null);
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) { throw new Error('Failed to fetch product details')};
                const data = await response.json();
                setProduct(data);

                if (!hoveredImage && data.images?.length > 0) {
                  setHoveredImage(data.images[0]);
                }

                addToBrowsingHistory(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, addToBrowsingHistory, hoveredImage]);

    const handleThumbnailHover = (image) => {
      if (image !== hoveredImage) {
        setHoveredImage(image);
        setZoomPosition({ x: 0, y: 0})
      }
    }

    const handleQuantityChange = (e) => {
      setSelectedQuantity(parseInt(e.target.value, 10));
    };

    const handleAddToCart = () => {
      addToCart(product, selectedQuantity)
    }

    const handleMouseMove = (e) => {
        if (!isZoomed || !mainImageRef.current ) return;

        const { left, top, width, height} = mainImageRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const boxWidth = width * 0.25;
        const boxHeight = height * 0.25;

        const mouseX = Math.min(Math.max(boxWidth/2, x), width - boxWidth/2);
        const mouseY = Math.min(Math.max(boxHeight/2, y), height - boxHeight/2);

        const posX = ((mouseX - boxWidth/2) / width) * 100;
        const posY = ((mouseY - boxHeight/2) / height) * 100;

        const zoomX = (mouseX / width) * 100;
        const zoomY = (mouseY / height) * 100;

        setZoomPosition({
            x: posX,
            y: posY,
            zoomX,
            zoomY
        });
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <>
        <Header />
        <NavBar />
        {product && (
            <div id="product-details-container">
                <div id="product-small-images">
                    {product.images.map((image, index) => (
                        <img src={image} key={index} alt={product.title} onMouseEnter={() => handleThumbnailHover(image)} />
                    ))}
                </div>

                <div  id="product-image"
                      onMouseMove={handleMouseMove}
                      ref={mainImageRef} onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
                    <img src={hoveredImage} alt={product.title}/>

                    {isZoomed && (
                        <div
                            id="zoom-box"
                            style={{
                                width: '25%',
                                height: '25%',
                                left: `${zoomPosition.x}%`,
                                top: `${zoomPosition.y}%`
                            }}
                            >
                        </div>
                    )}
                </div>

                {isZoomed && (
                    <div id="product-image-zoom">
                        <img src={hoveredImage} alt={`${product.title} zoomed`} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          transform: `scale(4) translate(-${zoomPosition.zoomX}%, -${zoomPosition.zoomY}%)`,
                          transformOrigin: '0 0'
                        }}/>
                    </div>
                )}

                <div id="product-info">
                    <h4>{product.title}</h4>

                    <div id="rating-display">
                        <p>{product.rating}</p>
                        {renderStars(product.rating, product.reviews)}
                        <p>{product.reviews.length} ratings</p>
                    </div>

                    <div id="discounted-price">
                        <p id="discount">-{product.discountPercentage}%</p>
                        <p> <sup>₹</sup>{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                    </div>
                    <p id="original-price">M.R.P: <span>₹{product.price}</span></p>

                    <p> <strong>Brand:</strong> {product.brand}</p>

                    <hr />

                    <div id="product-description">
                      <h4>About this item</h4>
                      <p>{product.description}</p>
                    </div>
                  
                    <div id="customer-reviews">
                        <h4>Customer reviews</h4>
                        {product.reviews.map((review, index) => (
                            <div key={index}>

                            <div className="reviewer-info">
                              <img src="/images/user-logo.png" alt="customer-icon" />
                              {review.reviewerName}
                            </div>
                            <div className="review-content">
                              {renderStars(review.rating)}
                              {review.comment}
                            </div>
                            <p>{new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            </div>
                        ))}
                    </div>

                    <div id="product-details">
                        <h4>Product details</h4>
                        <p>
                            <strong>Produt Dimensions:</strong> &nbsp;
                            {product.dimensions.depth}×{product.dimensions.width}×{product.dimensions.height};{product.weight} g
                        </p>
                        <p> <strong>Manufacturer:</strong> {product.brand}</p>
                        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                        <p> <strong>Item Model No:</strong> {product.sku}</p>
                        <p> <strong>Item Weight:</strong> {product.weight} g</p>
                    </div>
                </div>

                <div id="product-order-details">
                  <p>{product.shippingInformation} on your first order free.</p>
                  <p> Deliver to
                    <img src="/images/black-location.png" alt="loaction-logo" />
                    {location}
                  </p>
                  <p className={product.availabilityStatus === 'In Stock' ? 'in-stock' : 'low-stock'}>
                    {product.availabilityStatus}
                  </p>

                  <div>
                    <p>Payment <span>Secure tranaction</span></p>
                    <p>Ships from <span>Amazon</span></p>
                    <p>Sold by <span>{product.brand}</span></p>
                  </div>

                  <label htmlFor="quantity"> Quantity
                    <select name="quantity" id="quantity" onChange={handleQuantityChange} value={selectedQuantity}>
                      {[...Array(15)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                  </select>
                  </label>

                  <button id="add-to-cart" onClick={handleAddToCart}>Add to cart</button>
                  <button id="buy-now">Buy Now</button>
                </div>
            </div>
        )}
        <Footer />
        </>
    )
}

export default ProductDetails;