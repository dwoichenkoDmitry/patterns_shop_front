import React, {useEffect, useState} from 'react';
import classes from './ProductUpdate.module.css'
import {useAxios} from "../../Hooks/useAxios";
import ChangeProductForId from "./ChangeProductForId";

const ProductUpdate = () => {
    const [products, setProducts] = useState([])
    const {GetAxios, URL} = useAxios()
    const [changeId, setChangeId] = useState('')
    const [vision, setVision] = useState(false)
    const [updateGet, setUpdateGet] = useState(0)
    let count = 0;
    let update = false
    useEffect(( ) => {
        if (update) return
        update = true
        GetAxios("api/products/getAllProductMainInfo").then((request)=> {
            setProducts(request.data.products)

            count += 1
            console.log(count)
        })
    },[updateGet])

    function OpenChangeWindow(id) {
        setChangeId(id)
        setVision(true)
    }

    return (
        <div className={classes.container}>
            {products.map((item, index)=>
                <div key={index} className={classes.productBody}>
                    <img src={URL+"img/"+item.image}/>
                    <h4>{item.name}</h4>
                    <h3>{item.price}</h3>
                    <h3 onClick={()=>{OpenChangeWindow(item.id)}}>Изменить</h3>
                </div>
            )

            }
            {vision?
                <ChangeProductForId updateGet={setUpdateGet} visionFunc={setVision} idProduct={changeId}/>
                :
                ''
            }

        </div>
    );
};

export default ProductUpdate;