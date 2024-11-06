import { useState } from "react";
import Header from "./header";
import NavBar from "./navbar";
import { useCart } from './cartContext';
import HistoryCarousel from "./historyCarousel";
import Footer from "./footer";

function Cart({ location }) {
    const { cartItems, setItemQuantity, removeFromCart, clearSelectedItems} = useCart();
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (newSelectAll) {
            setSelectedItems(new Set(cartItems.map(item => item.id)));
        } else {
            setSelectedItems(new Set());
        }
    }

    const handleItemSelect = (itemId) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
            setSelectAll(false);
        } else {
            newSelected.add(itemId);
            if (newSelected.size === cartItems.length) {
                setSelectAll(true);
            }
        }
        setSelectedItems(newSelected);
    }

    const calculateTotal = () => {
        const selectedTotal = cartItems.filter(item => selectedItems.has(item.id))
        .reduce((total, item) => {
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            return total + (discountedPrice * item.quantity);
        }, 0)

        return selectedTotal.toFixed(2);
    }

    const getSelectedQuantity = () => {
        return cartItems.filter(item => selectedItems.has(item.id))
        .reduce((total, item) => total + item.quantity, 0);
    }

    const handleProceedToBuy = () => {
        if (selectedItems.size === 0) {
            alert("Please select items to purchase");
            return;
        }

        clearSelectedItems(Array.from(selectedItems));
        setSelectedItems(new Set());
        setSelectAll(false);
        setOrderPlaced(true);

        setTimeout(() => {
            setOrderPlaced(false);
        }, 5000);
    }

   return (
        <>
            <Header location={location}/>
            <NavBar />
            <div id="cart">
                <div id="cart-container">
                    <h3>Shopping Cart</h3>
                    {orderPlaced ? (
                        <div className="order-success">
                            <h2>Thank you for your order!</h2>
                            <p>Your order has been placed successfully.</p>
                        </div>
                    ) : (
                        <>
                            <p onClick={toggleSelectAll} className="select-all-text">
                                {selectAll ? "Deselect all items" : "Select all items"}
                            </p>
                            <p id="price-heading">Price</p>
                            <hr />
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <>
                                    {cartItems.map(item => (
                                        <div className="cart-item-container" key={item.id}>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedItems.has(item.id)} 
                                                onChange={() => handleItemSelect(item.id)}
                                            />
                                            <div className="cart-item">
                                                <img src={item.thumbnail} alt={item.title} />
                                                <div>
                                                    <h1>{item.title}</h1>
                                                    <p className={item.availabilityStatus === 'In Stock' ? 'in-stock' : 'low-stock'}>
                                                        {item.availabilityStatus}
                                                    </p>
                                                    <p>{item.shippingInformation}</p>
                                                    <label htmlFor="quantity">
                                                        <select 
                                                            name="quantity" 
                                                            id="quantity" 
                                                            value={item.quantity} 
                                                            onChange={(e) => setItemQuantity(item.id, parseInt(e.target.value))}
                                                        >
                                                            {[...Array(15)].map((_, index) => (
                                                                <option key={index + 1} value={index + 1}>
                                                                    {index + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label><br />
                                                    <button className="cart-item-delete" onClick={() => removeFromCart(item.id)}>Delete</button>
                                                </div>
                                            </div>
                                            <p className="cart-item-price">
                                                ₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="cart-total">
                                        <h3>SubTotal: ({getSelectedQuantity()}): ₹{calculateTotal()}</h3>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div id="sub-total">
                    <p>SubTotal: ({getSelectedQuantity()}): ₹{calculateTotal()}</p>
                    <button onClick={handleProceedToBuy}>Proceed to buy</button>
                </div>
            </div>
            <div id="cart-history">
                <HistoryCarousel/>
            </div>
            <Footer /> 
        </>
    )
}

export default Cart;