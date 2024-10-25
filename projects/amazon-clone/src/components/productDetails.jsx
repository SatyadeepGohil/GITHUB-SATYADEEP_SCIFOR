import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) { throw new Error('Failed to fetch product details')};
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return product && (
        <div>
            <h1>{product.title}</h1>

             {product.images.map((image, index) => (
                    <img src={image} key={index} alt={product.title} />
                ))}
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.rating}</p>
            <p>Rating: {product.rating}</p>
        </div>
    )
}

export default ProductDetails;