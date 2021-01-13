import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey); // should do this using useEffect() and loading data from database
    console.log(product);
    return (
        <div>
            {/* <h1> {productKey} Detials coming soon.....</h1> */}
            <h1> Your Product Details </h1>
            <Product product = {product} showAddToCart = {false}></Product>
        </div>
    );
};

export default ProductDetail;