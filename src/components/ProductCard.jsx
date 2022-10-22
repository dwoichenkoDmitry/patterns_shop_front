import React from 'react';
import classes from "./ProductCard.module.css";
import {useAxios} from "./Hooks/useAxios";

const ProductCard = ({curItem}) => {
    const {URL} = useAxios()
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardImg}>
                <img className={classes.imgOnCard} src={URL+'img/'+curItem.image} alt="product"/>
            </div>
            <div>
                <h2 className={classes.cardName}>{curItem.name}</h2>
                <h3 className={classes.cardPrice}>{curItem.price} руб.</h3>
                <p className={classes.podrobText}>Подробнее</p>
            </div>

        </div>
    );
};

export default ProductCard;