import React from 'react';
import classes from "./InterSection.module.css"
import ImgInter from "../img/mainPageImg.jpg"
import Slider from "./Slider";

const InterSection = () => {
    return (
        <div className={classes.InterSect}>
            <div className={classes.leftSect}><img src={ImgInter} alt="img"/></div>
            <div className={classes.rightSect}><Slider/></div>
        </div>
    );
};

export default InterSection;