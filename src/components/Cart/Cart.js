import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,pd) => total + pd.price, 0);
    //The above statement of total with reduce function can be written as following 
    let total = 0;
    for (let i = 0; i < cart.length;i++){
        const product = cart[i];
        total = total + product.price * product.quantity; 
        // debugger;
    }


    let shipping = 0;
    if (total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
   

    // const tax = (total / 10).toFixed(2);
    const tax = (total / 10);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2); //when we use toFixed() it converts 
    //the number into a string, that's why we are using Number() here to convert it back to number again
    
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4 className ="text-danger">Order Summary!</h4>
            <p>Items ordered: {cart.length}</p>
            {/* <p>Product price: {total.toFixed(2)}</p> */}
            <p>Product price: {formatNumber(total)}</p>
            <p><small>Shipping: {shipping} </small></p>
            <p><small>Tax: {formatNumber(tax)} </small></p>
            <p>Total Price: {grandTotal}</p>
            {/* <Link to="/review">
            <button className="cart-button">Review Order</button>
            </Link> */}
            {
                props.children 
                //This children of the Cart component are placed here.
            }

            
        </div>
    );
};

export default Cart;