import React from "react";
import Header from "./header";
import NavBar from "./navbar";
import CartContext from './cartContext';
import Footer from "./footer";

function Cart({ location }) {
    return (
        <>
            <Header location={location}/>
            <NavBar />

            <Footer /> 
        </>
    )
}

export default Cart;