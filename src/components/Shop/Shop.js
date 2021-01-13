import React from 'react';
import fakeData from '../../fakeData';
import {useState,useEffect} from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] =  useState(first10); 
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        } )
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) =>{
         // console.log('Product Added', product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count); // to see total number of the same product added to the cart 
    }



    
    return (
        <div className="twin-container">
            {/* <h1>This is Shop!</h1> */}
            {/* <h3>{products.length}</h3> */}
            <div className="product-container">
                {/* <ul>
                    {
                        
                        products.map(product => <li>{product.name}</li>) 
                    }
                </ul> */}
                {
                    products.map(pd => <Product 
                        product={pd} 
                        handleAddProduct = {handleAddProduct} 
                        showAddToCart={true} 
                        key = {pd.key}
                        ></Product>) 
                }



            </div>
            <div className="cart-container">
                    {/* <h3>This is cart</h3> */}
                    {/* <h5>Order Summary: {cart.length}</h5> */}
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="cart-button">Review Order</button> 
                            {/* this button is a children of Cart component and is accessed from Cart.js file 
                            we make this children here so that this button will be shown only on shop page */}
                        </Link>
                    </Cart>
            </div>
            
        </div>
    );
};

export default Shop;