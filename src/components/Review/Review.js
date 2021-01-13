import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'; // first ../ bring it out of the Review folder and second ../ brings it out of the components folder
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]); //[] means empty array, means initially cart value will be 0.
    const [orderPlaced, setOrderPlaced] = useState(false); //the value of orderPlaced is  false now. When the value will change to true, we will assign setOrderPlaced = true
    const history = useHistory();

    const handleProceedCheckout = () => {
        // console.log("Order placed");

        //setCart([]); //Making the cart empty because this existing products in the cart will be bought(processed)
        //setOrderPlaced(true);
        //processOrder();

        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        // console.log("Product removed ", productKey);
        const newCart = cart.filter(pd => pd.key != productKey); //filters the product to show the ones which keys are not the same as the one removed(productKey)
        setCart(newCart); //updating the existing cart after filtering 
        removeFromDatabaseCart(productKey); //to remove the product from the local storage as well so the remove product don't reappear when page is refreshed
    }
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // const counts = productKeys.map(key => savedCart[key]);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;

        });
        setCart(cartProducts);

    },[])

    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>
    }
    
    return (
        <div className="twin-container">
            {/* <h1>Cart Items: {cart.length}</h1> */}
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    product={pd} 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    ></ReviewItem> )
            }
            {thankyou}

            </div>
            <div className = "cart-container">
                <Cart cart={cart}>
                    {/* <button className="cart-button" onClick = {placeOrderHandler}>Place Order</button> */}
                    <button className="cart-button" onClick = {handleProceedCheckout}>Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;