import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import { useCart } from "./cartContext";
import { useBrowsingHistory } from "./browserHistoryContext";

function renderStars(rating) {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  const { addToBrowsingHistory } = BrowsingHistoryProvider;
  
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
    const { addToCart } = useCart();
    const { addToBrowsingHistory } = useBrowsingHistory();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) { throw new Error('Failed to fetch product details')};
                const data = await response.json();
                setProduct(data);
                setHoveredImage(data.images[0]);

                addToBrowsingHistory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, addToBrowsingHistory]);

    const handleMouseMove = (e) => {
        if (!isZoomed) return;

        const { left, top, width, height} = e.target.getBoundingClientRect();
        const mouseX = ((e.clientX - left) / width) * 100;
        const mouseY = ((e.clientY - top) / height) * 100;

        const zoomBoxWidth = 25;
        const zoomBoxHeight = 25;
        const halfZoomBoxWidth = zoomBoxWidth / 2;
        const halfZoomBoxHeight = zoomBoxHeight / 2;

        let newX = mouseX - halfZoomBoxWidth;
        let newY = mouseY - halfZoomBoxHeight;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > 100 - zoomBoxWidth) newX = 100 - zoomBoxWidth;
        if (newY > 100 - zoomBoxHeight) newY = 100 - zoomBoxHeight;

        const zoomX = newX + halfZoomBoxWidth;
        const zoomY = newY + halfZoomBoxHeight;

        setZoomPosition({
            x: newX,
            y: newY,
            zoomX: zoomX,
            zoomY: zoomY,
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
                        <img src={image} key={index} alt={product.title} onMouseEnter={() => {setHoveredImage(image)}} />
                    ))}
                </div>

                <div id="product-image" onMouseMove={handleMouseMove} onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
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
                            transform: `scale(3.5) translate(-${zoomPosition.zoomX}%, -${zoomPosition.zoomY}%)`,
                            transformOrigin: 'top left'
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
                            <>
                            <p> <img src="/images/user-logo.png" alt="customer-icon" /> {review.reviewerName}</p>
                            <p>{renderStars(review.rating)} {review.comment}</p>
                            <p>{new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            </>
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

                  <label htmlFor="select"> Quantity
                    <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                  </label>

                  <button id="add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
                  <button id="buy-now">Buy Now</button>
                </div>
            </div>
        )}
        <Footer />
        </>
    )
}

export default ProductDetails;