import React, {useEffect, useState} from 'react';
import classes from './ProductStyles/MainByCategory.module.css'
import {useAxios} from "../Hooks/useAxios";
import ProductLink from "./ProductLink";
import {Link} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const MainByCategory = ({name}) => {

    const {GetAxios} = useAxios()
    const [products, setProducts] = useState([])
    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios('api/products/getCategoryId/'+name).then((request)=>{
            setProducts(request.data.products)
            setLoaded(true)
        })


    },[])


    const [loaded, setLoaded] = useState(false)

    if (!loaded) return <Preloader/>

    return (
        <div className={classes.container}>
            {products.map((item,index)=>
                <Link className={classes.links} to={"/products/" + item.id}><ProductLink key={index} product={item}/></Link>
            )}
        </div>
    );
};

export default MainByCategory;