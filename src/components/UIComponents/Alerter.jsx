import React from 'react';
import classes from "./Alerter.module.css"

const Alerter = ({message, showAlert, functionVisible, closeWindow}) => {
    function CloseAlert(){
        showAlert(false)

        if (closeWindow===true){
            functionVisible(false)
        }

    }

    return (
        <div className={classes.shadowFon}>
            <div className={classes.alerter}>
                <h2 className={classes.textMes}>{message}</h2>
                <h1 onClick={CloseAlert} className={classes.btn}>ОК</h1>
            </div>
        </div>
    );
};

export default Alerter;