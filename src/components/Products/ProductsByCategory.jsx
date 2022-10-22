import React from 'react';
import MainHeader from "../MainHeader";
import MainByCategory from "./MainByCategory";
import {useParams} from "react-router-dom";

const ProductsByCategory = () => {
    const {name} = useParams()

    return (
        <div>
            <MainHeader/>
            <MainByCategory name={name}/>
        </div>
    );
};

export default ProductsByCategory;