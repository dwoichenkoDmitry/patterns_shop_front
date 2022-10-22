import React from 'react';
import classes from "./Slider.module.css"

const Slider = () => {
    return (
        <div className={classes.slider}>
            <div className={[classes.sliderImg,classes.sliderImgPrev].join(' ')}>
                 <h1>first</h1>
            </div>
            <div className={classes.sliderImg}>
                <h1>second</h1>
            </div>
            <div className={[classes.sliderImg,classes.sliderImgNext].join(' ')}>
                <h1>tri</h1>
            </div>
        </div>
    )
};

export default Slider;