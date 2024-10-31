import React from "react";
import Header from "./header";
import NavBar from "./navbar";
import { useCart } from './cartContext';
import Footer from "./footer";

function Cart({ location }) {
    const { cartItems, setItemQuantity, removeFromCart } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            return total + (discountedPrice * item.quantity);
        }, 0);
    }

    return (
        <>
            <Header location={location}/>
            <NavBar />
             <div id="cart-container">
                <h1>Shopping Cart</h1>
                <p>Price</p>
                <hr />
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div className="card-item-container" key={item.id}>
                                <input type="checkbox"/>
                                <div className="cart-item-info">
                                    <img src={item.thumbnail} alt={item.title} />
                                    <div>
                                        <h1>{item.title}</h1>
                                        <p className={item.availabilityStatus === 'In Stock' ? 'in-stock' : 'low-stock'}>
                                            {item.availabilityStatus}
                                        </p>
                                        <p>{item.shippingInformation}</p>
                                        <label htmlFor="quantity">
                                            <select name="quantity" id="quantity" value={item.quantity} onChange={(e) => setItemQuantity(item.id, parseInt(e.target.value))}>
                                                {[...Array(15)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
                            <button>Proceed to Checkout</button>
                        </div>
                    </>
                )}
            </div>
            <Footer /> 
        </>
    )
}

export default Cart;