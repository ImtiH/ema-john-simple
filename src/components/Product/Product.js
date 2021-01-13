import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props.product);
  // console.log(props);
  const { img, name, seller, price, stock,key } = props.product;
  return (
    <div className="product">
      <div>
        {/* <img src={props.product.img} alt=""/> */}
        <img src={img} alt="" />
      </div>

      <div className="product-description">
        {/* <h4>{props.product.name} </h4>  */}
        <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
        {/* {"/"+key} will make the name clickable and will generate key in the url once clicked.  */}
        {/* <br/> */}
        <p> <small>by: {seller}</small> </p>
        <h4>Price: ${price}</h4>
        
        <p> <small>Only {stock} left in stock - order now!</small> </p>

        {props.showAddToCart === true &&  <button className="cart-button" onClick={() => props.handleAddProduct(props.product)}>       
          <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
        </button>}
      </div>
    </div>
  );
};

export default Product;
