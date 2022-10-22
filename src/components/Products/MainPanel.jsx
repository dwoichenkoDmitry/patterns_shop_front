import React, {useState, useEffect} from 'react';
import classes from "./ProductStyles/MainPanel.module.css"
import ProductCard from "../ProductCard";
import CategoryCard from "../Categories/CategoryCard";
import {useAxios} from "../Hooks/useAxios";
import {Link} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const MainPanel = () => {



    const [products, setProducts] = useState([]
    )

    const {GetAxios} = useAxios()

    let update = false

    useEffect(( ) => {
        if(update)return
        update=true

        GetAxios('api/products/allCategories').then((response) => {
            let mas = []




            for (let i=0; i<Object.keys(response.data.data).length;i++){

                mas.push(response.data.data[i])
            }

            setProducts(mas)
            setLoaded(true)
        })
    }, []);

    const [loaded, setLoaded] = useState(false)

    if (!loaded) return <Preloader/>

    return (
        <div className={classes.MainContainer}>
            <h1 className={classes.headerText}>Выкройки</h1>
            <div className={classes.container}>
                {products.map((item, index) =>
                    <Link className={classes.links} to={"/categories/" + item.name}><CategoryCard key={index} name={item.name} link={item.image}/></Link>
                )}
            </div>
        </div>

    );
};

export default MainPanel;