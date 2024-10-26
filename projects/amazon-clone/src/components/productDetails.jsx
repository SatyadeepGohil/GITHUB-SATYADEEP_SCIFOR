import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredImage, setHoveredImage] = useState('');
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) { throw new Error('Failed to fetch product details')};
                const data = await response.json();
                setProduct(data);
                setHoveredImage(data.images[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
            <div id="product-details">
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
                            transform: `scale(4) translate(-${zoomPosition.zoomX}%, -${zoomPosition.zoomY}%)`,
                            transformOrigin: 'top left'
                        }}/>
                    </div>
                )}

                <h1>{product.title}</h1>
                <p>Price: ₹{product.price}</p>
                <p>Description: {product.rating}</p>
                <p>Rating: {product.rating}</p>
            </div>
        )}
        <Footer />
        </>
    )
}

export default ProductDetails;