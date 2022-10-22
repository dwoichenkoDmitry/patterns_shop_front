import React, {useEffect, useRef, useState} from 'react';
import classes from "./SignUp.module.css";
import Alerter from "./UIComponents/Alerter";
import {useAuth} from "./Hooks/useAuth";
import {useAxios} from "./Hooks/useAxios";

const SighUp = ({changeVision}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    changeVision(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    let {signIn} = useAuth()

    const loginRef = useRef(null)
    const passwordRef = useRef(null)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [message, setMessage] = useState("")

    const [showAlert, setAlert] = useState(false)
    const [closeAlert, setCloseAlert] = useState(false)

    const {GetAxios} = useAxios()

    function AddRegistration(){
        if(loginRef.current.value.length>0 && passwordRef.current.value.length > 7){
            GetAxios('api/checkUser/'+ loginRef.current.value +'/'+passwordRef.current.value).then(request =>{
                if (request.data.check === 'notExist'){
                    setMessage("Пользователя с таким логином не существует")
                    setCloseAlert(false)
                    setAlert(true)
                }
                else {
                    signIn({login: loginRef.current.value, name: request.data.name, mail: request.data.mail, staff: request.data.admin})

                }
                changeVision(false)
            }).catch(err => console.log(err))
        }
    }


    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.RegisterWindow}>
                <h1 className={classes.headerText}>Регистрация</h1>
                <h3>Логин</h3>
                <input ref={loginRef} type="text"/>
                <h3>Пароль</h3>
                <input ref={passwordRef} type="password"/>
                <h2 onClick={AddRegistration} className={classes.RegBtn}>Авторизация</h2>
            </div>
            {showAlert?
            <Alerter closeWindow={closeAlert} functionVisible={changeVision} showAlert={setAlert} message={message}/>
                :
                ''
            }
        </div>
    );
};

export default SighUp;