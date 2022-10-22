import React, {useState} from 'react';
import classes from '../AdminStyles/NavProducts.module.css'
import NavProducts from "../NavProducts";
import ProductUpdate from "./ProductUpdate";


const ProductAdd = () => {
    const [activeBtn, setActive] = useState(true)

    return (
        <div>
            <div className={classes.navBtns}>
                <div onClick={(e)=>{setActive(true)}}>
                    <h4 className={activeBtn? classes.active:''}>Добавление</h4>
                </div>
                <div onClick={(e)=>{setActive(false)}}>
                    <h4 className={!activeBtn? classes.active:''}>Изменение</h4>
                </div>
            </div>
            {activeBtn?
                <NavProducts/>
                :
                <ProductUpdate/>
            }

        </div>
    );
};

export default ProductAdd;