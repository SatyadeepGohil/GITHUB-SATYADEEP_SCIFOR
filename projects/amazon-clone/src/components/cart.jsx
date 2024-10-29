import React from "react";
import Header from "./header";
import NavBar from "./navbar";
import { useCart } from './cartContext';
import Footer from "./footer";

function Cart({ location }) {
    const { cartItems, addToCart, removeFromCart, getItemCountById } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const discountedPrice = item.price * (1 - item.discountedPrice / 100);
            return total + (discountedPrice * (item.quantity || 1));
        }, 0);
    }
    return (
        <>
            <Header location={location}/>
            <NavBar />
             <div id="cart-container">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} />
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</p>
                                    <p>Quantity: {item.quantity || 1}</p>
                                    <button onClick={() => addToCart(item)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
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