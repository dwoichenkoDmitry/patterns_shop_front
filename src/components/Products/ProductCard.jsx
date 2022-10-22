import React, {useEffect, useState} from 'react';
import classes from './ProductStyles/ProductCard.module.css'
import MainHeader from "../MainHeader";
import PanelProductCard from "./PanelProductCard";
import {useParams} from "react-router-dom";
import {useAxios} from "../Hooks/useAxios";
import Preloader from "../Preloader/Preloader";

const ProductCard = () => {
    const {id} = useParams()

    const {GetAxios} = useAxios()

    const [product, setProduct] = useState({id: 23, name: '2a', img:"32"})
    const [sizes, setSizes] = useState([])

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios("api/products/getProductForId/"+id).then((request)=> {
            setProduct(request.data.products)
            setSizes(request.data.sizes)
            setLoaded(true)
        })
    }, [])
    const [loaded, setLoaded] = useState(false)

    if (!loaded) return(
        <div>
            <MainHeader/>
            <Preloader/>
        </div>
    )

    return (
        <div>
            <MainHeader/>
            <PanelProductCard idProd={id} product={product} sizeList={sizes}/>
        </div>
    );
};

export default ProductCard;