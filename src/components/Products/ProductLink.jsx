import React from 'react';
import classes from './ProductStyles/ProductLink.module.css'
import {useAxios} from "../Hooks/useAxios";

const ProductLink = ({product}) => {
    const {URL} = useAxios()
    return (
        <div className={classes.container}>
            <img className={classes.productImg} src={URL+"img/"+product.image} alt="product"/>
            <div>
                <h4>{product.name}</h4>
                {product.discount?
                    <h4><s>{product.oldPrice}</s></h4>
                    :
                    ''
                }
                <h3>{product.price}</h3>
            </div>

        </div>
    );
};

export default ProductLink;