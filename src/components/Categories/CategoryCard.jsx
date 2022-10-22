import React from 'react';
import classes from "./CategoryStyles/CategoryCard.module.css"
import {useAxios} from "../Hooks/useAxios";


const CategoryCard = ({name, link}) => {
    const {URL} = useAxios()
    return (
        <div className={classes.container}>
            <img src={URL+"img/"+link} alt={name}/>
            <h3>{name}</h3>
        </div>
    );
};

export default CategoryCard;