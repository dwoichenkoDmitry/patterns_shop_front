import React, {useState} from 'react';
import classes from "../AdminStyles/NavProducts.module.css";
import NavProducts from "../NavProducts";
import ProductUpdate from "../AdminProduct/ProductUpdate";
import CourseAdd from "./CourseAdd";
import CourseUpdate from "./CourseUpdate";


const CoursesMain = () => {
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
                <CourseAdd/>
                :
                <CourseUpdate/>
            }
        </div>
    );
};

export default CoursesMain;