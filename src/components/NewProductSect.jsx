import React, {useState, useEffect} from 'react';
import classes from "./NewProductSect.module.css"
import ProductCard from "./ProductCard";
import {useAxios} from "./Hooks/useAxios";

const NewProductSect = () => {
    const [products, setProducts] = useState([])

    const {GetAxios} = useAxios()

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        funn()
    }, [])

    function funn(){
        GetAxios("api/products/GetFourLastProducts").then((response)=>{
            setProducts([...response.data.answer])
        })
    }

    return (
        <div className={classes.ProductSect}>
            <h1>Последние работы</h1>
            <div className={classes.container}>
                {products.map((item,index) =>
                    <ProductCard curItem={item} key={index}/>
                )
                }
            </div>
        </div>
    );
};

export default NewProductSect;