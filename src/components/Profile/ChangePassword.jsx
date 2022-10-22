import React, {useRef, useEffect} from 'react';
import classes from "./ProfileStyles/ChangePassword.module.css";

const ChangePassword = ({setVision}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVision(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef);
    
    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.RegisterWindow}>
                <h2>Смена пароля</h2>
                <div className={classes.container}>
                    <div className={classes.side}>
                        <h3>Старый пароль</h3>
                        <h3>Новый пароль</h3>
                        <h3>Повторите пароль</h3>
                    </div>
                    <div className={classes.side}>
                        <input type="password"/>
                        <input type="password"/>
                        <input type="password"/>
                    </div>
                </div>
                <h2 className={classes.changeBtn}>Сменить</h2>
            </div>
        </div>
    );
};

export default ChangePassword;