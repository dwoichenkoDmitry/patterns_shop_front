import React from 'react';
import classes from "./MainPanelNav.module.css";

const MainPanelNav = () => {
    return (
        <div className={classes.main}>
            <div className={classes.mainContainer}>
                <div className={classes.container}>
                    <div className={classes.firstImg}></div>
                    <div className={classes.secImg}></div>
                    <div className={classes.centerImg}></div>
                    <div className={classes.triImg}></div>
                    <div className={classes.fourImg}></div>
                </div>
            </div>
        </div>
    );
};

export default MainPanelNav;