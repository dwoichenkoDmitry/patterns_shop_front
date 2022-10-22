import React, {useState} from 'react';
import classes from './CategoryUpdate.module.css'
import CategoryAdd from "./CategoryAdd";
import CategoryChange from "./CategoryChange";


const CategoryNav = () => {
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
                <CategoryAdd/>
                :
                <CategoryChange/>

            }
        </div>
    );
};

export default CategoryNav;