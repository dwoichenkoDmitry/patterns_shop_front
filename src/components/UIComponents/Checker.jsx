import React, {useRef} from 'react';
import classes from "./Checker.module.css"

const Checker = ({CheckerKey, changeCheck, checkKey, setFirst, setSec}) => {
    function check(){
        if (CheckerKey===1){
            changeCheck(true)
            setFirst(true)
            setSec(false)
        }
        else{
            changeCheck(false)
            setFirst(false)
            setSec(true)
        }
    }

    const CheckRef = useRef(null)

    return (
        <div className={classes.container}>
            {checkKey?
                <div ref={CheckRef} onClick={check} className={classes.checkerBlack}>

                </div>
                :
                <div ref={CheckRef} onClick={check} className={classes.checkerWhite}>

                </div>
            }
        </div>
    );
};

export default Checker;