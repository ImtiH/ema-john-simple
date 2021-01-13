import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name,quantity,key,price} = props.product;

    const reviewItemStyle = {
        borderBottom : '1px solid lightgray',
        marginBottom: '15px',
        paddingBottom: '5px',
        marginLeft: '100px'
    };
    return (
        <div style={reviewItemStyle} className="review-item">
            <h5 className="product-name">{name}</h5>
            <h5>Quantity: {quantity}</h5>
            <p><small>Price: ${price}</small></p>
            <br/>
            <button className="cart-button"
                onClick = {() => props.removeProduct(key)}
            > Remove</button>
        </div>
    );
};

export default ReviewItem;